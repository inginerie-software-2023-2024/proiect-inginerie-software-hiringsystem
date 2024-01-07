package ro.hiringsystem.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ro.hiringsystem.model.dto.CandidateUserDto;
import ro.hiringsystem.model.dto.JobApplicationDto;
import ro.hiringsystem.model.dto.UserDto;
import ro.hiringsystem.model.enums.Status;
import ro.hiringsystem.service.CandidateUserService;
import ro.hiringsystem.service.EmailSenderService;
import ro.hiringsystem.service.JobApplicationService;
import ro.hiringsystem.service.JobService;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/application")
@RequiredArgsConstructor

public class JobApplicationsController {

    private final JobApplicationService jobApplicationService;

    private final EmailSenderService emailSenderService;

    private final CandidateUserService candidateUserService;

    private final JobService jobService;

    @PostMapping("/create")
    public ResponseEntity<JobApplicationDto> create (@RequestParam(required = true) UUID jobId, Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            return ResponseEntity.ok(jobApplicationService.create(jobId, ((UserDto) authentication.getPrincipal()).getId()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/erase")
    public ResponseEntity<JobApplicationDto> erase(@RequestParam(required = true) UUID id) {
        JobApplicationDto jobApplicationDto = jobApplicationService.getById(id);

        if(jobApplicationDto.getStatus().toString().equalsIgnoreCase("REJECTED")
                || jobApplicationDto.getStatus().toString().equalsIgnoreCase("ACCEPTED")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } else {
            jobApplicationService.removeElementById(id);

            CandidateUserDto candidateUserDto = candidateUserService.getById(jobApplicationDto.getCandidateUserId());

            String toEmail = candidateUserDto.getPrimaryEmail();
            String toApplicantName = candidateUserDto.getFirstName();
            String jobTitle = jobService.getById(jobApplicationDto.getJobId()).getTitle();

            emailSenderService.sendApplicationErasedEmail(toEmail, toApplicantName, jobTitle);

            return ResponseEntity.ok().build();
        }
    }

    @PostMapping("/withdraw")
    public ResponseEntity<JobApplicationDto> withdraw(@RequestParam(required = true) UUID id, Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            UserDto userDto = (UserDto) authentication.getPrincipal();

            UUID candidateUserId = userDto.getId();
            UUID jobApplicationUserId = jobApplicationService.getById(id).getCandidateUserId();

            if (candidateUserId.equals(jobApplicationUserId)) {
                if (jobApplicationService.getById(id).getStatus().toString().equalsIgnoreCase("REJECTED")
                        || jobApplicationService.getById(id).getStatus().toString().equalsIgnoreCase("ACCEPTED")) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                } else {
                    jobApplicationService.removeElementById(id);
                    return ResponseEntity.ok().build();
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/check/{id}")
    public ResponseEntity<Object> checkIfAlreadyApplied(@PathVariable("id") UUID jobId, Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            UserDto userDto = (UserDto) authentication.getPrincipal();

            UUID candidateUserId = userDto.getId();

            return ResponseEntity.ok(jobApplicationService.checkIfAlreadyApplied(jobId, candidateUserId));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/apply/{id}")
    public ResponseEntity<Object> applyToJob(@PathVariable("id") UUID jobId, Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            UserDto userDto = (UserDto) authentication.getPrincipal();

            String toEmail = userDto.getPrimaryEmail();
            String applicantName = userDto.getFirstName();
            String jobTitle = jobService.getById(jobId).getTitle();

            emailSenderService.sendApplicationSubmittedEmail(toEmail, applicantName, jobTitle);

            UUID candidateUserId = userDto.getId();

            return ResponseEntity.ok(jobApplicationService.create(jobId, candidateUserId));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/get/all/{id}")
    public ResponseEntity<Object> getAllByJobId(@PathVariable("id") UUID jobId) {
        return ResponseEntity.ok(jobApplicationService.getAllByJobId(jobId));
    }

    @PreAuthorize("hasAuthority('MANAGER') || hasAuthority('INTERVIEWER')")
    @GetMapping("/get/all/status/{status}")
    public ResponseEntity<Object> getAllByStatus(@PathVariable("status") Status status) {
        return ResponseEntity.ok(jobApplicationService.getAllByStatus(status));
    }

    @PreAuthorize("hasAuthority('MANAGER') || hasAuthority('INTERVIEWER')")
    @GetMapping("/get/all/user/{userId}/status/{status}")
    public ResponseEntity<Object> getAllByUserIdAndStatus(@PathVariable("userId") UUID userId, @PathVariable("status") Status status) {
        return ResponseEntity.ok(jobApplicationService.getAllByUserIdAndStatus(userId, status));
    }

    @GetMapping("/get/all/user/{userId}")
    public ResponseEntity<Object> getApplications(@PathVariable UUID userId){
        return ResponseEntity.ok(jobApplicationService.getAllByUserId(userId));
    }

    @GetMapping("/get/all/my")
    public ResponseEntity<Object> getMyApplications(Authentication authentication){
        if (authentication != null && authentication.isAuthenticated()) {
            return ResponseEntity.ok(jobApplicationService.getAllByUserId(((UserDto) authentication.getPrincipal()).getId()));
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/status/update/{status}/{id}")
    public ResponseEntity<Object> updateStatus(@PathVariable("status") String status, @PathVariable("id") UUID id){
        if(status.equalsIgnoreCase("ACCEPTED")) {
            CandidateUserDto candidateUserDto = candidateUserService.getById(jobApplicationService.getById(id).getCandidateUserId());

            String toEmail = candidateUserDto.getPrimaryEmail();
            String toApplicantName = candidateUserDto.getFirstName();
            String jobTitle = jobService.getById(jobApplicationService.getById(id).getJobId()).getTitle();

            emailSenderService.sendApplicationAcceptedEmail(toEmail, toApplicantName, jobTitle);

            return ResponseEntity.ok(jobApplicationService.accept(id));
        }
        else if(status.equalsIgnoreCase("REJECTED")) {
            CandidateUserDto candidateUserDto = candidateUserService.getById(jobApplicationService.getById(id).getCandidateUserId());

            String toEmail = candidateUserDto.getPrimaryEmail();
            String toApplicantName = candidateUserDto.getFirstName();
            String jobTitle = jobService.getById(jobApplicationService.getById(id).getJobId()).getTitle();

            emailSenderService.sendApplicationRejectedEmail(toEmail, toApplicantName, jobTitle);

            return ResponseEntity.ok(jobApplicationService.reject(id));
        }
        else
            return ResponseEntity.badRequest().build();
    }

    @GetMapping("/get/{id}/user")
    public ResponseEntity<CandidateUserDto> getUserByApplicationId(@PathVariable("id") UUID applicationId){
        JobApplicationDto jobApplicationDto = jobApplicationService.getById(applicationId);
        return ResponseEntity.ok(candidateUserService.getById(jobApplicationDto.getCandidateUserId()));
    }
}
