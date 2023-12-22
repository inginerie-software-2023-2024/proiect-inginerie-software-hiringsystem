package ro.hiringsystem.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
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

    @GetMapping("id/{mail}")
    public ResponseEntity<Object> getIdByMail(@PathVariable("mail") String mail){
        Map<String, UUID> map = new HashMap<>();
        map.put("id", userRepository.findIdByEmail(mail));
        return ResponseEntity.ok(map);
    }

    @GetMapping("/type/{id}")
    public ResponseEntity<Object> getTypeById(@PathVariable("id") UUID id){
        Map<String, String> map = new HashMap<>();
        Class<?> type = userRepository.findTypeById(id);
        String typeString="unknown";
        if(type == CandidateUser.class){
            typeString = "candidate";
        }
        else if(type == InterviewerUser.class){
            typeString = "interviewer";
        }
        else if(type == ManagerUser.class){
            typeString = "manager";
        }

        map.put("type", typeString);
        return ResponseEntity.ok(map);
    }

    @GetMapping("/{mail}")
    public ResponseEntity<Boolean> isEmailUsed(@PathVariable("mail") String mail){
        return ResponseEntity.ok(userRepository.isEmailUsed(mail));
    }

    @GetMapping(value = "getLoggedIn", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDto> getLoggedInUser(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            UserDto userDto = (UserDto) authentication.getPrincipal();

            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/change/password")
    public ResponseEntity<Void> changePassword(Authentication authentication, @RequestBody ChangePasswordRequest request) {
        if(authentication == null || !authentication.isAuthenticated())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        UserDto userDto = (UserDto) authentication.getPrincipal();
        boolean status = userService.changePassword(userDto, request);

        if (status) {
            System.out.println("ahahahaa");
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } else {
            System.out.println("passw");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
