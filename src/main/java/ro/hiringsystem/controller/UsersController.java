package ro.hiringsystem.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.hiringsystem.model.dto.CandidateUserDto;
import ro.hiringsystem.model.dto.InterviewerUserDto;
import ro.hiringsystem.model.dto.ManagerUserDto;
import ro.hiringsystem.model.dto.UserDto;
import ro.hiringsystem.model.entity.CandidateUser;
import ro.hiringsystem.model.entity.InterviewerUser;
import ro.hiringsystem.model.entity.ManagerUser;
import ro.hiringsystem.repository.UserRepository;
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
    public ResponseEntity<Object> getIdByMail(@PathVariable("mail") String mail){
        Map<String, UUID> map = new HashMap<>();
        map.put("id", userRepository.findIdByEmail(mail));
        return ResponseEntity.ok(map);
    }

    @GetMapping("details/{email}/short")
    public ResponseEntity<Object> getShortDetailsById(@PathVariable("email") String email){
        Map<String, String> map = new HashMap<>();
        UserDto user = userService.getByEmail(email);

        map.put("firstName", user.getFirstName());
        map.put("lastName", user.getLastName());
        map.put("id", user.getId().toString());
        map.put("type", getType(user.getClass()));
        return ResponseEntity.ok(map);
    }

    @GetMapping("/type/{id}")
    public ResponseEntity<Object> getTypeById(@PathVariable("id") UUID id){
        Map<String, String> map = new HashMap<>();
        Class<?> type = userRepository.findTypeById(id);
        map.put("type", getType(type));
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
}
