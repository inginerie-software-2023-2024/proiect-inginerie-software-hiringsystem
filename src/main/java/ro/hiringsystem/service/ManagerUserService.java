package ro.hiringsystem.service;

import ro.hiringsystem.model.dto.CandidateUserDto;
import ro.hiringsystem.model.dto.InterviewerUserDto;
import ro.hiringsystem.model.dto.ManagerUserDto;
import ro.hiringsystem.model.dto.UserDto;
import ro.hiringsystem.model.entity.InterviewerUser;

import java.util.Map;
import java.util.UUID;

public interface ManagerUserService extends UserService<ManagerUserDto> {

    Map<UUID, ManagerUserDto> getByLastName(String lastName);

    CandidateUserDto createCandidate(CandidateUserDto candidateUserDto);

    InterviewerUserDto createInterviewer(InterviewerUserDto interviewerUserDto);
}
