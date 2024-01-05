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

    @PostMapping("/erase")
    @PreAuthorize("hasAuthority('MANAGER') || hasAuthority('INTERVIEWER')")
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
    @PreAuthorize("hasAuthority('CANDIDATE')")
    public ResponseEntity<JobApplicationDto> withdraw(@RequestParam(required = true) UUID id, Authentication authentication) {
        UserDto userDto = (UserDto) authentication.getPrincipal();

        UUID candidateUserId = userDto.getId();
        UUID jobApplicationUserId = jobApplicationService.getById(id).getCandidateUserId();

        if (candidateUserId.equals(jobApplicationUserId)) {
            if (jobApplicationService.getById(id).getStatus().toString().equalsIgnoreCase("REJECTED")
                    || jobApplicationService.getById(id).getStatus().toString().equalsIgnoreCase("ACCEPTED")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            } else {
                jobApplicationService.removeElementById(id);
                return ResponseEntity.ok().build();}
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/check/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Object> checkIfAlreadyApplied(@PathVariable("id") UUID jobId, Authentication authentication) {
        UserDto userDto = (UserDto) authentication.getPrincipal();

        UUID candidateUserId = userDto.getId();

        return ResponseEntity.ok(jobApplicationService.checkIfAlreadyApplied(jobId, candidateUserId));
    }

    @PostMapping("/apply/{id}")
    @PreAuthorize("hasAuthority('CANDIDATE')")
    public ResponseEntity<Object> applyToJob(@PathVariable("id") UUID jobId, Authentication authentication) {
        UserDto userDto = (UserDto) authentication.getPrincipal();

        String toEmail = userDto.getPrimaryEmail();
        String applicantName = userDto.getFirstName();
        String jobTitle = jobService.getById(jobId).getTitle();

        emailSenderService.sendApplicationSubmittedEmail(toEmail, applicantName, jobTitle);

        UUID candidateUserId = userDto.getId();

        return ResponseEntity.ok(jobApplicationService.create(jobId, candidateUserId));
    }

    @GetMapping("/get/all/{id}")
    @PreAuthorize("hasAuthority('INTERVIEWER') || hasAuthority('MANAGER')")
    public ResponseEntity<Object> getAllByJobId(@PathVariable("id") UUID jobId) {
        return ResponseEntity.ok(jobApplicationService.getAllByJobId(jobId));
    }

    @GetMapping("/get/all/user/{userId}")
    @PreAuthorize("hasAuthority('INTERVIEWER') || hasAuthority('MANAGER')")
    public ResponseEntity<Object> getApplications(@PathVariable UUID userId){
        return ResponseEntity.ok(jobApplicationService.getAllByUserId(userId));
    }

    @GetMapping("/get/all/my")
    @PreAuthorize("hasAuthority('CANDIDATE')")
    public ResponseEntity<Object> getMyApplications(Authentication authentication){
        return ResponseEntity.ok(jobApplicationService.getAllByUserId(((UserDto) authentication.getPrincipal()).getId()));
    }

    @PostMapping("/status/update/{status}/{id}")
    @PreAuthorize("hasAuthority('MANAGER') || hasAuthority('INTERVIEWER')")
    public ResponseEntity<Object> updateStatus(@PathVariable("status") String status, @PathVariable("id") UUID id){
        if(status.equalsIgnoreCase("ACCEPTED")) {
            CandidateUserDto candidateUserDto = candidateUserService.getById(jobApplicationService.getById(id).getCandidateUserId());

            String toEmail = candidateUserDto.getPrimaryEmail();
            String toApplicantName = candidateUserDto.getFirstName();
            String jobTitle = jobService.getById(jobApplicationService.getById(id).getJobId()).getTitle();

            emailSenderService.sendApplicationAcceptedEmail(toEmail, toApplicantName, jobTitle);

            return ResponseEntity.ok(jobApplicationService.accept(id));
        } else if(status.equalsIgnoreCase("REJECTED")) {
            CandidateUserDto candidateUserDto = candidateUserService.getById(jobApplicationService.getById(id).getCandidateUserId());

            String toEmail = candidateUserDto.getPrimaryEmail();
            String toApplicantName = candidateUserDto.getFirstName();
            String jobTitle = jobService.getById(jobApplicationService.getById(id).getJobId()).getTitle();

            emailSenderService.sendApplicationRejectedEmail(toEmail, toApplicantName, jobTitle);

            return ResponseEntity.ok(jobApplicationService.reject(id));
        } else
            return ResponseEntity.badRequest().build();
    }

    @GetMapping("/get/{id}/user")
    @PreAuthorize("hasAuthority('MANAGER') || hasAuthority('INTERVIEWER')")
    public ResponseEntity<CandidateUserDto> getUserByApplicationId(@PathVariable("id") UUID applicationId){
        JobApplicationDto jobApplicationDto = jobApplicationService.getById(applicationId);
        return ResponseEntity.ok(candidateUserService.getById(jobApplicationDto.getCandidateUserId()));
    }
}
