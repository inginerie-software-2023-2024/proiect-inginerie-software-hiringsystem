package ro.hiringsystem.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ro.hiringsystem.model.dto.CandidateUserDto;
import ro.hiringsystem.model.dto.ManagerUserDto;
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
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<Void> deleteCandidateUser(@PathVariable("id") UUID id) {
        candidateUserService.removeElementById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("get/all/paginated")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<List<CandidateUserDto>> getAllCandidateUsersPaginated(@RequestParam("page") int page, @RequestParam("size") int size) {
        if(page <= 0)
            page = 1;
        return ResponseEntity.ok(candidateUserService.getAll(page-1, size));
    }

    @GetMapping("profile/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CandidateUserDto> getCandidateUser(@PathVariable("id") String id, Authentication authentication) {
        if(id.equals("me"))
            return ResponseEntity.ok((CandidateUserDto) authentication.getPrincipal());
        else {
            try {
                ManagerUserDto managerUserDto = (ManagerUserDto) authentication.getPrincipal();

                return ResponseEntity.ok(candidateUserService.getById(UUID.fromString(id)));
            } catch (ClassCastException e) {
                throw new RuntimeException("You can not view another user's profile!");
            }
        }
    }

    @GetMapping(value="get/cv/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CVDto> getCandidateUserCV(@PathVariable("id") UUID id, Authentication authentication) {
        CandidateUserDto candidateUserDto = candidateUserService.getById(id);

        try {
            CandidateUserDto candidateUserDtoAuth = (CandidateUserDto) authentication.getPrincipal();

            if (candidateUserDto.getId().equals(candidateUserDtoAuth.getId())) {
                return ResponseEntity.ok(candidateUserService.getUserCV(id));
            } else {
                throw new RuntimeException("You can not see a CV that is not yours!");
            }
        } catch (ClassCastException e) {
            return ResponseEntity.ok(candidateUserService.getUserCV(id));
        }
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<CandidateUserDto> register(@RequestBody CandidateUserDto candidateUserDto){
        return ResponseEntity.ok(candidateUserService.create(candidateUserDto));
    }

    @PostMapping("edit/{id}")
    @PreAuthorize("hasAuthority('CANDIDATE')")
    public ResponseEntity<CandidateUserDto> editCandidateUser(
            @PathVariable("id") UUID id,
            @RequestBody CandidateUserDto candidateUserDto
    ){
        candidateUserDto.setId(id);
        candidateUserService.saveElement(candidateUserDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("edit/cv/{id}")
    @PreAuthorize("hasAuthority('CANDIDATE')")
    public ResponseEntity<CandidateUserDto> editCandidateUserCv(
            @PathVariable("id") UUID id,
            @RequestBody CVDto cvDto
    ) {
        cvDto.setId(id);
        candidateUserService.updateCv(cvDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "profile/update/details/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('CANDIDATE')")
    public ResponseEntity<CandidateUserDto> editCandidateUserPersonalDetails(
            @PathVariable("id") UUID id,
            @RequestBody PersonalDetailsDto personalDetailsDto
    ){
        CandidateUserDto candidateUserDto = candidateUserService.getById(id);

        if (candidateUserDto.getPrimaryEmail().equals(personalDetailsDto.getPrimaryEmail())) {
            candidateUserService.updatePersonalDetails(personalDetailsDto, id);
            return ResponseEntity.ok().build();
        } else {
            throw new RuntimeException("You can not edit personal details that are not yours!");
        }
    }

    @PostMapping(value = "profile/update/academic/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('CANDIDATE')")
    public ResponseEntity<CandidateUserDto> editCandidateUserAcademicBackground(
            @PathVariable("id") UUID id,
            @RequestBody List<AcademicExperienceDto> academicBackgroundDtoList
    ){
        boolean ok = true;

        for (AcademicExperienceDto academicExperienceDto : academicBackgroundDtoList) {
            if (!academicExperienceDto.getId().equals(id)){
                ok = false;
                break;
            }
        }

        if (ok) {
            candidateUserService.updateAcademicBackground(academicBackgroundDtoList, id);
            return ResponseEntity.ok().build();
        } else {
            throw new RuntimeException("You can not edit academic backgrounds that are not yours!");
        }
    }

    @PostMapping(value = "profile/update/work/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('CANDIDATE')")
    public ResponseEntity<CandidateUserDto> editCandidateUserWorkExperience(
            @PathVariable("id") UUID id,
            @RequestBody List<WorkExperienceDto> workExperienceDtoList
    ){
        boolean ok = true;

        for (WorkExperienceDto workExperienceDto : workExperienceDtoList) {
            if (!workExperienceDto.getId().equals(id)){
                ok = false;
                break;
            }
        }

        if (ok) {
            candidateUserService.updateWorkExperience(workExperienceDtoList, id);
            return ResponseEntity.ok().build();
        } else {
            throw new RuntimeException("You can not edit work experiences that are not yours!");
        }
    }

    @PostMapping(value = "profile/update/projects/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('CANDIDATE')")
    public ResponseEntity<CandidateUserDto> editCandidateUserProjects(
            @PathVariable("id") UUID id,
            @RequestBody List<ProjectDto> projectDtoList
    ){
        boolean ok = true;

        for (ProjectDto projectDto : projectDtoList) {
            if (!projectDto.getId().equals(id)){
                ok = false;
                break;
            }
        }

        if (ok) {
            candidateUserService.updateProjects(projectDtoList, id);
            return ResponseEntity.ok().build();
        } else {
            throw new RuntimeException("You can not edit projects that are not yours!");
        }
    }
}