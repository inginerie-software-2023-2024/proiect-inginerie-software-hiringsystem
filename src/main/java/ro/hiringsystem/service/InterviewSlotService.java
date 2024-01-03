package ro.hiringsystem.service;

import ro.hiringsystem.model.dto.interview.InterviewSlotDto;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

public interface InterviewSlotService {

    InterviewSlotDto getById(UUID id);

    InterviewSlotDto create(InterviewSlotDto interviewSlotDto);

    void saveElement(InterviewSlotDto interviewSlotDto);

    boolean deleteById(UUID id);

    void cleanupOldSlots();

    List<InterviewSlotDto> getAllByUserId(UUID userId);

    List<InterviewSlotDto> getAllByRoomId(UUID roomId);

    HashMap<LocalDate, List<InterviewSlotDto>> getAllByDate(LocalDate date);

    HashMap<LocalDate, List<InterviewSlotDto>> getAllAvailableByRoomId(UUID roomId);

    HashMap<LocalDate, List<InterviewSlotDto>> getAllFormattedForUserId(UUID userId);

    List<InterviewSlotDto> getAll();
}
