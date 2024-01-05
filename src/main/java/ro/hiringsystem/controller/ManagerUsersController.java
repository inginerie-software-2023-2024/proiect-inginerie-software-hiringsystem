package ro.hiringsystem.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ro.hiringsystem.model.dto.CandidateUserDto;
import ro.hiringsystem.model.dto.InterviewerUserDto;
import ro.hiringsystem.model.dto.ManagerUserDto;
import ro.hiringsystem.model.dto.UserDto;
import ro.hiringsystem.service.ManagerUserService;

import java.util.UUID;

@RestController
@RequestMapping(value = "/api/v1/manager")
@RequiredArgsConstructor
public class ManagerUsersController {
    private final ManagerUserService managerUserService;

    @GetMapping("profile/{id}")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<ManagerUserDto> getManagerUser(@PathVariable("id") String id, Authentication authentication) {
        if (id.equals("me"))
            return ResponseEntity.ok((ManagerUserDto) authentication.getPrincipal());
        else
            return ResponseEntity.ok(managerUserService.getById(UUID.fromString(id)));
    }

    @PostMapping("create")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<ManagerUserDto> createMangerUser(@RequestBody ManagerUserDto managerUserDto){
        return ResponseEntity.ok(managerUserService.create(managerUserDto));
    }

    @PostMapping("create/candidate")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<CandidateUserDto> createCandidateUser(@RequestBody CandidateUserDto candidateUserDto){
        return ResponseEntity.ok(managerUserService.createCandidate(candidateUserDto));
    }

    @PostMapping("create/interviewer")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<InterviewerUserDto> createInterviewerUser(@RequestBody InterviewerUserDto interviewerUserDto){
        return ResponseEntity.ok(managerUserService.createInterviewer(interviewerUserDto));
    }
}
