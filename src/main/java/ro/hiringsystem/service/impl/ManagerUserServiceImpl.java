package ro.hiringsystem.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ro.hiringsystem.mapper.CandidateUserMapper;
import ro.hiringsystem.mapper.InterviewerUserMapper;
import ro.hiringsystem.mapper.ManagerUserMapper;
import ro.hiringsystem.model.abstracts.User;
import ro.hiringsystem.model.auxiliary.CV;
import ro.hiringsystem.model.dto.CandidateUserDto;
import ro.hiringsystem.model.dto.InterviewerUserDto;
import ro.hiringsystem.model.dto.UserDto;
import ro.hiringsystem.model.dto.cv.CVDto;
import ro.hiringsystem.model.entity.CandidateUser;
import ro.hiringsystem.model.entity.InterviewerUser;
import ro.hiringsystem.model.entity.ManagerUser;
import ro.hiringsystem.model.dto.ManagerUserDto;
import ro.hiringsystem.repository.CandidateUserRepository;
import ro.hiringsystem.repository.InterviewerUserRepository;
import ro.hiringsystem.repository.ManagerUserRepository;
import ro.hiringsystem.security.auth.ChangePasswordRequest;
import ro.hiringsystem.service.ManagerUserService;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ManagerUserServiceImpl implements ManagerUserService {

    private final CandidateUserRepository candidateUserRepository;
    private final InterviewerUserRepository interviewerUserRepository;
    private final ManagerUserRepository managerUserRepository;
    private final CandidateUserMapper candidateUserMapper;
    private final InterviewerUserMapper interviewerUserMapper;
    private final ManagerUserMapper managerUserMapper;
    private final PasswordEncoder passwordEncoder;

    /**
     * Retrieves a manager user by ID.
     *
     * @param id the ID of the manager user
     * @return the ManagerUserDto object
     * @throws RuntimeException if the user is not found
     */
    @Override
    public ManagerUserDto getById(UUID id) {
        Optional<ManagerUser> managerUser = managerUserRepository.findById(id);

        if(managerUser.isEmpty()) {
            throw new RuntimeException("User not found!");
        }

        return managerUserMapper.toDto(managerUser.get());
    }

    /**
     * Retrieves manager users by last name as a map with IDs as keys and ManagerUserDto objects as values.
     *
     * @param lastName the last name of the manager users
     * @return a map of ManagerUserDto objects
     */
    @Override
    public Map<UUID, ManagerUserDto> getByLastName(String lastName) {
        return listToMap(managerUserRepository.findByLastName(lastName).stream()
                .map(managerUserMapper::toDto).toList());
    }

    /**
     * Retrieves a manager user by email.
     *
     * @param email the email of the manager user
     * @return the ManagerUserDto object
     * @throws RuntimeException if the user is not found
     */
    @Override
    public ManagerUserDto getByEmail(String email) {
        Optional<ManagerUser> managerUser = managerUserRepository.findByEmail(email);

        if(managerUser.isEmpty()) {
            throw new RuntimeException("User not found!");
        }

        return managerUserMapper.toDto(managerUser.get());
    }

    /**
     * Retrieves all manager users as a map with IDs as keys and ManagerUserDto objects as values.
     *
     * @return a map of ManagerUserDto objects
     */
    @Override
    public Map<UUID, ManagerUserDto> getAll() {
        return listToMap(managerUserRepository.findAll().stream()
                .map(managerUserMapper::toDto).toList());
    }

    /**
     * Adds multiple manager users from the given map to the repository.
     *
     * @param managerUserMap the map of ManagerUserDto objects
     */
    @Override
    public void addAllFromGivenMap(Map<UUID, ManagerUserDto> managerUserMap) {
        managerUserRepository.saveAll(managerUserMap.values().stream()
                .map(managerUserMapper::toEntity).toList());
    }

    /**
     * Adds a manager user to the repository.
     *
     * @param managerUser the ManagerUserDto object to be added
     */
    @Override
    public void add(ManagerUserDto managerUser) {
        managerUserRepository.save(managerUserMapper.toEntity(managerUser));
    }

    /**
     * Removes a manager user from the repository by its ID.
     *
     * @param id the ID of the manager user to be removed
     * @throws RuntimeException if the user is not found
     */
    @Override
    public void removeElementById(UUID id) {
        Optional<ManagerUser> managerUser = managerUserRepository.findById(id);

        if(managerUser.isEmpty()) {
            throw new RuntimeException("User not found!");
        }

        else managerUserRepository.delete(managerUser.get());
    }

    /**
     * Saves a manager user to the repository.
     *
     * @param managerUserDto the ManagerUserDto object to be saved
     * @throws RuntimeException if the user is not found
     */
    @Override
    public void saveElement(ManagerUserDto managerUserDto) {
        Optional<ManagerUser> managerUser = managerUserRepository.findById(managerUserDto.getId());

        if(managerUser.isEmpty()) {
            throw new RuntimeException("User not found!");
        }

        else managerUserRepository.save(managerUserMapper.toEntity(managerUserDto));
    }

    /**
     * Converts a list of ManagerUserDto objects to a map with IDs as keys and ManagerUserDto objects as values.
     *
     * @param managerUserDtoList the list of ManagerUserDto objects
     * @return a map of ManagerUserDto objects
     */
    @Override
    public Map<UUID, ManagerUserDto> listToMap(List<ManagerUserDto> managerUserDtoList) {
        Map<UUID, ManagerUserDto> managerUserDtoMap = new HashMap<>();

        for (ManagerUserDto user : managerUserDtoList) {
            managerUserDtoMap.put(user.getId(), user);
        }

        return managerUserDtoMap;
    }

    /**
     * Creates a new manager user.
     *
     * @param managerUserDto the ManagerUserDto object representing the new user
     * @return the created ManagerUserDto object
     */
    @Override
    public ManagerUserDto create(ManagerUserDto managerUserDto) {
        if(managerUserDto.getId()==null)
            managerUserDto.setId(UUID.randomUUID());

        managerUserDto.setPassword(passwordEncoder.encode(managerUserDto.getPassword()));

        ManagerUser managerEntity = managerUserMapper.toEntity(managerUserDto);
        managerUserRepository.save(managerEntity);
        return managerUserMapper.toDto(managerEntity);
    }
    @Override
    public CandidateUserDto createCandidate(CandidateUserDto candidateUserDto) {
        if(candidateUserDto.getId()==null)
            candidateUserDto.setId(UUID.randomUUID());

        candidateUserDto.setPassword(passwordEncoder.encode(candidateUserDto.getPassword()));

        CandidateUser candidateEntity = candidateUserMapper.toEntity(candidateUserDto);
        candidateEntity.setCv(new CV(candidateEntity.getId()));
        candidateUserRepository.save(candidateEntity);
        return candidateUserMapper.toDto(candidateEntity);
    }
    @Override
    public InterviewerUserDto createInterviewer(InterviewerUserDto interviewerUserDto) {
        if(interviewerUserDto.getId()==null)
            interviewerUserDto.setId(UUID.randomUUID());

        interviewerUserDto.setPassword(passwordEncoder.encode(interviewerUserDto.getPassword()));

        InterviewerUser interviewerEntity = interviewerUserMapper.toEntity(interviewerUserDto);
        interviewerUserRepository.save(interviewerEntity);
        return interviewerUserMapper.toDto(interviewerEntity);
    }
    @Override
    public boolean changePassword(ManagerUserDto managerUserDto, ChangePasswordRequest changePasswordRequest) {
        Optional<ManagerUser> managerUser = managerUserRepository.findById(managerUserDto.getId());

        if(managerUser.isEmpty()) {
            throw new RuntimeException("User not found!");
        } else {
            ManagerUser manager = managerUser.get();
            String password = manager.getPassword();
            String oldPassword = changePasswordRequest.getOldPassword();

            if(passwordEncoder.matches(oldPassword, password)) {
                manager.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
                managerUserRepository.save(manager);

                return true;
            } else {
                return false;
            }
        }
    }

    @Override
    public void resetPassword(ManagerUserDto managerUserDto, String newPassword) {
        Optional<ManagerUser> managerUser = managerUserRepository.findById(managerUserDto.getId());

        if(managerUser.isEmpty()) {
            throw new RuntimeException("User not found!");
        } else {
            ManagerUser manager = managerUser.get();

            manager.setPassword(passwordEncoder.encode(newPassword));
            managerUserRepository.save(manager);
        }
    }
}
