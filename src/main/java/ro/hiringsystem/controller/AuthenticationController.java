package ro.hiringsystem.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.hiringsystem.security.auth.AuthenticationRequest;
import ro.hiringsystem.security.auth.AuthenticationResponse;
import ro.hiringsystem.security.auth.RegisterRequest;
import ro.hiringsystem.service.AuthenticationService;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;

    @PostMapping("/register")
    public ResponseEntity<Void> register(
            @RequestBody RegisterRequest request
    ){
        authService.register(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/register/confirm/{token}")
    public ResponseEntity<Boolean> confirmRegister(
            @PathVariable UUID token
    ){
        return ResponseEntity.ok(authService.confirmRegister(token));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request, HttpServletResponse responseServlet
    ){
        AuthenticationResponse response = authService.authenticate(request);

        // Create cookies
        Cookie accessTokenCookie = new Cookie("access_token", response.getAccessToken());
        Cookie refreshTokenCookie = new Cookie("refresh_token", response.getRefreshToken());

        // Set HTTP-only attribute for security
        accessTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setHttpOnly(true);
        responseServlet.addCookie(refreshTokenCookie);

        // Add other cookie attributes as needed (e.g., secure, path, domain, max age)

        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        authService.refreshToken(request, response);
    }

    @PostMapping("/forgot/password")
    public ResponseEntity<Void> forgotPassword(@RequestBody String email){
        authService.forgotPassword(email);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset/password/{token}")
    public ResponseEntity<Boolean> resetPassword(@PathVariable UUID token, @RequestBody String newPassword){
        return ResponseEntity.ok(authService.resetPassword(token, newPassword));
    }
}
