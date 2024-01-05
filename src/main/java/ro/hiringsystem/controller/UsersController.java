package ro.hiringsystem.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ro.hiringsystem.model.dto.CandidateUserDto;
import ro.hiringsystem.model.dto.InterviewerUserDto;
import ro.hiringsystem.model.dto.ManagerUserDto;
import ro.hiringsystem.model.dto.UserDto;
import ro.hiringsystem.model.entity.CandidateUser;
import ro.hiringsystem.model.entity.InterviewerUser;
import ro.hiringsystem.model.entity.ManagerUser;
import ro.hiringsystem.repository.UserRepository;
import ro.hiringsystem.security.auth.ChangePasswordRequest;
import ro.hiringsystem.service.UserService;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/v1/user")
@RequiredArgsConstructor
public class UsersController {
    //NOT A GOOD PRACTICE TO USE REPOSITORY IN CONTROLLER
    //should be replaced later, used for testing purposes only
    private final UserRepository userRepository;
    private final UserService<UserDto> userService;

    private String getType(Class<?> toIdentify){
        String typeString="unknown";
        if(toIdentify == CandidateUser.class || toIdentify == CandidateUserDto.class){
            typeString = "candidate";
        }
        else if(toIdentify == InterviewerUser.class || toIdentify == InterviewerUserDto.class){
            typeString = "interviewer";
        }
        else if(toIdentify == ManagerUser.class || toIdentify == ManagerUserDto.class){
            typeString = "manager";
        }

        return typeString;
    }

    @GetMapping("id/{mail}")
    @PreAuthorize("hasAuthority('MANAGER') || hasAuthority('INTERVIEWER')")
    public ResponseEntity<Object> getIdByMail(@PathVariable("mail") String mail){
        Map<String, UUID> map = new HashMap<>();
        map.put("id", userRepository.findIdByEmail(mail));
        return ResponseEntity.ok(map);
    }

    @GetMapping("details/{email}/short")
    @PreAuthorize("hasAuthority('MANAGER') || hasAuthority('INTERVIEWER')")
    public ResponseEntity<Object> getShortDetailsById(@PathVariable("email") String email){
        Map<String, String> map = new HashMap<>();
        UserDto user = userService.getByEmail(email);

        map.put("firstName", user.getFirstName());
        map.put("lastName", user.getLastName());
        map.put("id", user.getId().toString());
        map.put("type", getType(user.getClass()));
        return ResponseEntity.ok(map);
    }

    @GetMapping("/{mail}")
    public ResponseEntity<Boolean> isEmailUsed(@PathVariable("mail") String mail){
        return ResponseEntity.ok(userRepository.isEmailUsed(mail));
    }

    @GetMapping(value = "getLoggedIn", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserDto> getLoggedInUser(Authentication authentication) {
        UserDto userDto = (UserDto) authentication.getPrincipal();

        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/change/password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> changePassword(Authentication authentication, @RequestBody ChangePasswordRequest request) {
        UserDto userDto = (UserDto) authentication.getPrincipal();
        boolean status = userService.changePassword(userDto, request);

        if (status) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
