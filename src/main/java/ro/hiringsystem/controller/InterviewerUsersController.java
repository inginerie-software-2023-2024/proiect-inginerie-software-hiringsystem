package ro.hiringsystem.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ro.hiringsystem.model.dto.InterviewerUserDto;
import ro.hiringsystem.model.dto.ManagerUserDto;
import ro.hiringsystem.model.enums.InterviewerType;
import ro.hiringsystem.service.InterviewerUserService;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/v1/interviewer")
@RequiredArgsConstructor
public class InterviewerUsersController {
    private final InterviewerUserService interviewerUserService;

    @GetMapping("get/all/paginated")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<List<InterviewerUserDto>> getAllCandidateUsersPaginated(@RequestParam("page") int page, @RequestParam("size") int size) {
        if(page <= 0)
            page = 1;
        return ResponseEntity.ok(interviewerUserService.getAll(page-1, size));
    }

    @PostMapping("delete/{id}")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<Void> deleteCandidateUser(@PathVariable("id") UUID id) {
        interviewerUserService.removeElementById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("profile/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<InterviewerUserDto> getInterviewerUser(@PathVariable("id") String id, Authentication authentication) {
        if(id.equals("me"))
            return ResponseEntity.ok((InterviewerUserDto) authentication.getPrincipal());
        else {
            try {
                ManagerUserDto managerUserDto = (ManagerUserDto) authentication.getPrincipal();

                return ResponseEntity.ok(interviewerUserService.getById(UUID.fromString(id)));
            } catch (ClassCastException e) {
                throw new RuntimeException("You can not view another user's profile!");
            }
        }
    }

    @PostMapping("create")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<InterviewerUserDto> createInterviewerUser(@RequestBody InterviewerUserDto interviewerUserDto){
        return ResponseEntity.ok(interviewerUserService.create(interviewerUserDto));
    }

    @GetMapping("/types")
    public ResponseEntity<InterviewerType[]> getAllInterviewerTypes() {
        InterviewerType[] selectedTypes = Arrays.stream(InterviewerType.values())
                .toArray(InterviewerType[]::new);

        return ResponseEntity.ok(selectedTypes);
    }
}
