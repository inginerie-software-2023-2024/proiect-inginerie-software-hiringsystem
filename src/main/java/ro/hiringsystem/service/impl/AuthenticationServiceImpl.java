package ro.hiringsystem.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ro.hiringsystem.model.auxiliary.CV;
import ro.hiringsystem.model.dto.CandidateUserDto;
import ro.hiringsystem.model.dto.UserDto;
import ro.hiringsystem.security.JwtService;
import ro.hiringsystem.security.auth.AuthenticationRequest;
import ro.hiringsystem.security.auth.AuthenticationResponse;
import ro.hiringsystem.security.auth.RegisterRequest;
import ro.hiringsystem.security.token.Token;
import ro.hiringsystem.security.token.TokenRepository;
import ro.hiringsystem.security.token.TokenType;
import ro.hiringsystem.service.AuthenticationService;
import ro.hiringsystem.service.EmailSenderService;
import ro.hiringsystem.service.UserMapperService;
import ro.hiringsystem.service.UserService;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    // Injected dependencies
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;
    private final UserService<UserDto> userService;
    private final UserMapperService userMapper;
    private final EmailSenderService emailSenderService;

    // Maps to store login attempts, locked accounts, and users awaiting confirmation
    private final Map<UUID, Integer> loginAttempts = new ConcurrentHashMap<>();
    private final Map<UUID, Long> lockedAccounts = new ConcurrentHashMap<>();
    private final Map<UUID, CandidateUserDto> usersAwaitingConfirmation = new ConcurrentHashMap<>();

    // Constants for controlling login attempts and lockout duration
    private static final int MAX_LOGIN_ATTEMPTS = 3;
    private static final int LOCKOUT_DURATION_MINUTES = 1;

    /**
     * Registers a new candidate user.
     *
     * @param request the registration request containing user details
     */
    @Override
    public void register(RegisterRequest request) {
        try {
            CandidateUserDto candidateUser = CandidateUserDto.builder()
                    .id(UUID.randomUUID())
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .primaryEmail(request.getEmail())
                    .mailList(List.of(request.getEmail()))
                    .phoneNumberList(List.of())
                    .birthDate(request.getBirthDate())
                    .cv(new CV())
                    .build();

            // Send account confirmation email and store user in the awaiting confirmation map
            emailSenderService.sendAccountConfirmEmail(request.getEmail(), request.getFirstName(), candidateUser.getId().toString());
            usersAwaitingConfirmation.put(candidateUser.getId(), candidateUser);
            //userService.saveElement(candidateUser);

        } catch (Exception x) {
            x.printStackTrace();
        }
    }

    @Override
    public boolean confirmRegister(UUID token) {
        CandidateUserDto candidateUser = usersAwaitingConfirmation.getOrDefault(token, null);
        if (candidateUser == null)
            return false;
        userService.saveElement(candidateUser);
        usersAwaitingConfirmation.remove(token);
        return true;
    }

    /**
     * Increments the login attempts for a user and checks if the account should be locked.
     *
     * @param userId the ID of the user
     * @return the updated number of login attempts
     */
    private synchronized int incrementLoginAttempts(UUID userId) {
        loginAttempts.put(userId, loginAttempts.getOrDefault(userId, 0) + 1);
        return loginAttempts.get(userId);
    }

    /**
     * Checks if the account associated with a user ID is currently locked.
     *
     * @param userId the ID of the user
     * @return true if the account is locked, false otherwise
     */
    private boolean isAccountLocked(UUID userId) {
        Long lockoutTime = lockedAccounts.get(userId);
        if (lockoutTime != null && lockoutTime > System.currentTimeMillis()) {
            return true;
        }
        // If the account is not locked or the lockout has expired, clear the lockout state
        lockedAccounts.remove(userId);
        return false;
    }

    /**
     * Authenticates a user based on the provided credentials and generates access and refresh tokens.
     *
     * @param request the authentication request containing user credentials
     * @return the authentication response containing access token and refresh token
     */
    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        UUID userId = userService.getByEmail(request.getEmail()).getId();
        String email = request.getEmail();

        if (isAccountLocked(userId)) {
            long timeRemained = (lockedAccounts.get(userId) - System.currentTimeMillis()) / 1000;
            throw new RuntimeException("Account is locked. Please try again in " + timeRemained + " seconds.");
        }

        try {
            // Attempt to authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, request.getPassword())
            );

            UserDto user = userService.getByEmail(email);

            // Reset failed login attempts upon successful login
            loginAttempts.remove(userId);

            // Revoke existing user tokens and generate new ones
            revokeAllUserTokens(user);

            String jwtToken = jwtService.generateToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);

            // Save the new user token
            saveUserToken(user, jwtToken);

            // Return the authentication response
            return AuthenticationResponse.builder()
                    .accessToken(jwtToken)
                    .refreshToken(refreshToken)
                    .build();
        } catch (BadCredentialsException badCredExcep){
            // Increment failed login attempts and check if the account should be locked
            int attempts = (incrementLoginAttempts(userId) - 1) % 3 + 1;

            if (attempts == MAX_LOGIN_ATTEMPTS) {
                lockedAccounts.put(userId, System.currentTimeMillis() + LOCKOUT_DURATION_MINUTES * 60 * 1000);
                long timeRemained = (lockedAccounts.get(userId) - System.currentTimeMillis()) / 1000;
                throw new RuntimeException("Account is locked. Please try again in " + timeRemained + " seconds.");
            }

            throw new RuntimeException("Invalid credentials. Remaining attempts: " + (MAX_LOGIN_ATTEMPTS - attempts));
        }
    }

    /**
     * Saves the user token to the token repository.
     *
     * @param user     the user associated with the token
     * @param jwtToken the JWT token
     */
    private void saveUserToken(UserDto user, String jwtToken) {
        var token = Token.builder()
                .user(userMapper.toEntity(user))
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    /**
     * Revokes all tokens for a given user.
     *
     * @param user the user whose tokens need to be revoked
     */
    private void revokeAllUserTokens(UserDto user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    /**
     * Refreshes the access token using a refresh token.
     *
     * @param request  the HTTP servlet request
     * @param response the HTTP servlet response
     * @throws IOException if an I/O error occurs
     */
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String userEmail;
        final String refreshToken;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        if(refreshToken.isEmpty())
            return;

        try {
            userEmail = jwtService.extractUsername(refreshToken);
        } catch (ExpiredJwtException | MalformedJwtException e) {
            return;
        } catch (Exception x) {
            x.printStackTrace();
            return;
        }

        if (userEmail != null) {
            var user = userService.getByEmail(userEmail);
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                synchronized (this) {
                    revokeAllUserTokens(user);
                    saveUserToken(user, accessToken);
                }
                var authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
}
