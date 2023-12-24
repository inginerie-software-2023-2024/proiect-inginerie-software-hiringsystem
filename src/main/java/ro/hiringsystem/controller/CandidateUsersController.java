package ro.hiringsystem.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ro.hiringsystem.model.dto.CandidateUserDto;
import ro.hiringsystem.model.dto.PersonalDetailsDto;
import ro.hiringsystem.model.dto.cv.AcademicExperienceDto;
import ro.hiringsystem.model.dto.cv.CVDto;
import ro.hiringsystem.model.dto.cv.ProjectDto;
import ro.hiringsystem.model.dto.cv.WorkExperienceDto;
import ro.hiringsystem.service.CandidateUserService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/v1/candidate")
@RequiredArgsConstructor
public class CandidateUsersController {
    private final CandidateUserService candidateUserService;

    @PostMapping("delete/{id}")
    public ResponseEntity<Void> deleteCandidateUser(@PathVariable("id") UUID id) {
        candidateUserService.removeElementById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("get/all/paginated")
    public ResponseEntity<List<CandidateUserDto>> getAllCandidateUsersPaginated(@RequestParam("page") int page, @RequestParam("size") int size) {
        if(page <= 0)
            page = 1;
        return ResponseEntity.ok(candidateUserService.getAll(page-1, size));
    }

    @GetMapping("profile/{id}")
    public ResponseEntity<CandidateUserDto> getCandidateUser(@PathVariable("id") String id, Authentication authentication) {
        if(authentication == null || !authentication.isAuthenticated())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        if(id.equals("me"))
            return ResponseEntity.ok((CandidateUserDto) authentication.getPrincipal());
        else
            return ResponseEntity.ok(candidateUserService.getById(UUID.fromString(id)));
    }

    @GetMapping(value="get/cv/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CVDto> getCandidateUserCV(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(candidateUserService.getUserCV(id));
    }

    @PostMapping("/create")
    public ResponseEntity<CandidateUserDto> register(@RequestBody CandidateUserDto candidateUserDto){
        return ResponseEntity.ok(candidateUserService.create(candidateUserDto));
    }

    @PostMapping("edit/{id}")
    public ResponseEntity<CandidateUserDto> editCandidateUser(
            @PathVariable("id") UUID id,
            @RequestBody CandidateUserDto candidateUserDto
    ){
        candidateUserDto.setId(id);
        candidateUserService.saveElement(candidateUserDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("edit/cv/{id}")
    public ResponseEntity<CandidateUserDto> editCandidateUserCv(
            @PathVariable("id") UUID id,
            @RequestBody CVDto cvDto
    ) {
        cvDto.setId(id);
        candidateUserService.updateCv(cvDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "profile/update/details/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CandidateUserDto> editCandidateUserPersonalDetails(
            @PathVariable("id") UUID id,
            @RequestBody PersonalDetailsDto personalDetailsDto
    ){
        candidateUserService.updatePersonalDetails(personalDetailsDto, id);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "profile/update/academic/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CandidateUserDto> editCandidateUserAcademicBackground(
            @PathVariable("id") UUID id,
            @RequestBody List<AcademicExperienceDto> academicBackgroundDtoList
    ){
        candidateUserService.updateAcademicBackground(academicBackgroundDtoList, id);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "profile/update/work/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CandidateUserDto> editCandidateUserWorkExperience(
            @PathVariable("id") UUID id,
            @RequestBody List<WorkExperienceDto> workExperienceDtoList
    ){
        candidateUserService.updateWorkExperience(workExperienceDtoList, id);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "profile/update/projects/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CandidateUserDto> editCandidateUserProjects(
            @PathVariable("id") UUID id,
            @RequestBody List<ProjectDto> projectDtoList
    ){
        candidateUserService.updateProjects(projectDtoList, id);
        return ResponseEntity.ok().build();
    }
}