package ro.hiringsystem.service;

import ro.hiringsystem.model.dto.CandidateUserDto;
import ro.hiringsystem.model.dto.PersonalDetailsDto;
import ro.hiringsystem.model.dto.cv.AcademicExperienceDto;
import ro.hiringsystem.model.dto.cv.CVDto;
import ro.hiringsystem.model.dto.cv.ProjectDto;
import ro.hiringsystem.model.dto.cv.WorkExperienceDto;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface CandidateUserService extends UserService<CandidateUserDto> {

    Map<UUID, CandidateUserDto> getByLastName(String lastName);

    CVDto getUserCV(UUID userId);

    List<CandidateUserDto> getAll(int page, int size);

    int getNumberOfPages(int size);

    void updateCv(CVDto cvDto);

    void updatePersonalDetails(PersonalDetailsDto personalDetailsDto, UUID id);

    void updateAcademicBackground(List<AcademicExperienceDto> academicExperienceDtoList, UUID id);

    void updateWorkExperience(List<WorkExperienceDto> workExperienceDtoList, UUID id);

    void updateProjects(List<ProjectDto> projectDtoList, UUID id);
}
