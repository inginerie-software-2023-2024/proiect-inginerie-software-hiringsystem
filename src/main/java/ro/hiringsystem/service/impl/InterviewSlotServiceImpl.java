package ro.hiringsystem.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.hiringsystem.mapper.InterviewConferenceRoomMapper;
import ro.hiringsystem.mapper.InterviewParticipantMapper;
import ro.hiringsystem.mapper.InterviewSlotMapper;
import ro.hiringsystem.model.dto.interview.InterviewConferenceRoomDto;
import ro.hiringsystem.model.dto.interview.InterviewParticipantDto;
import ro.hiringsystem.model.dto.interview.InterviewSlotDto;
import ro.hiringsystem.model.entity.interview.InterviewConferenceRoom;
import ro.hiringsystem.model.entity.interview.InterviewSlot;
import ro.hiringsystem.repository.InterviewConferenceRoomRepository;
import ro.hiringsystem.repository.InterviewParticipantRepository;
import ro.hiringsystem.repository.InterviewSlotRepository;
import ro.hiringsystem.service.InterviewConferenceRoomService;
import ro.hiringsystem.service.InterviewSlotService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InterviewSlotServiceImpl implements InterviewSlotService {

    private final InterviewConferenceRoomService interviewConferenceRoomService;
    private final InterviewSlotRepository interviewSlotRepository;
    private final InterviewSlotMapper interviewSlotMapper;

    @Override
    public InterviewSlotDto getById(UUID id) {
        return interviewSlotMapper.toDto(interviewSlotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Interview slot not found!")));
    }

    @Override
    public InterviewSlotDto create(InterviewSlotDto interviewSlotDto) {
        if (interviewSlotDto.getId() == null)
            interviewSlotDto.setId(UUID.randomUUID());

        InterviewSlot slotEntity = interviewSlotMapper.toEntity(interviewSlotDto);
        interviewSlotRepository.save(slotEntity);
        return interviewSlotMapper.toDto(slotEntity);
    }

    @Override
    public void saveElement(InterviewSlotDto interviewSlotDto) {
        InterviewSlot slotEntity = interviewSlotMapper.toEntity(interviewSlotDto);
        interviewSlotRepository.save(slotEntity);
    }

    @Override
    public boolean deleteById(UUID id) {
        if (interviewSlotRepository.findById(id).isEmpty())
            return false;

        interviewSlotRepository.deleteById(id);
        return true;
    }

    @Override
    public List<InterviewSlotDto> getAllByUserId(UUID userId) {
        List<InterviewSlot> slots = interviewSlotRepository.findAllByUserId(userId);
        List<InterviewSlotDto> toReturn = new ArrayList<>();
        for (InterviewSlot slot : slots)
            toReturn.add(interviewSlotMapper.toDto(slot));
        return toReturn;
    }

    @Override
    public List<InterviewSlotDto> getAllByRoomId(UUID roomId) {
        List<InterviewSlot> slots = interviewSlotRepository.findAllByRoomId(roomId);
        List<InterviewSlotDto> toReturn = new ArrayList<>();
        for (InterviewSlot slot : slots)
            toReturn.add(interviewSlotMapper.toDto(slot));
        return toReturn;
    }

    @Override
    public HashMap<LocalDate, List<InterviewSlotDto>> getAllByDate(LocalDate date) {
        List<InterviewSlot> slots = interviewSlotRepository.findAllByDate(date);

        return new HashMap<>(slots.stream()
                .collect(Collectors.groupingBy(InterviewSlot::getDate,
                        Collectors.mapping(interviewSlotMapper::toDto, Collectors.toList()))));
    }

    @Override
    public HashMap<LocalDate, List<InterviewSlotDto>> getAllAvailableByRoomId(UUID roomId) {
        InterviewConferenceRoomDto room = interviewConferenceRoomService.getByIdFullyLoaded(roomId);

        // if the room has a start date, it means it's already scheduled
        if (room.getStartDate() != null)
            return new HashMap<>();

        UUID interviewer = room.getParticipants().stream().filter(InterviewParticipantDto::getIsRoomModerator).findFirst().get().getUserId();

        List<InterviewSlot> slots = interviewSlotRepository.findAllByUserId(interviewer).stream().filter(slot -> slot.getDate() != null).toList();

        return new HashMap<>(slots.stream()
                .collect(Collectors.groupingBy(InterviewSlot::getDate,
                        Collectors.mapping(interviewSlotMapper::toDto, Collectors.toList()))));
    }

    @Override
    public HashMap<LocalDate, List<InterviewSlotDto>> getAllFormattedForUserId(UUID userId) {
        List<InterviewSlot> slots = interviewSlotRepository.findAllByUserId(userId).stream().filter(slot -> slot.getDate() != null).toList();

        return new HashMap<>(slots.stream()
                .collect(Collectors.groupingBy(InterviewSlot::getDate,
                        Collectors.mapping(interviewSlotMapper::toDto, Collectors.toList()))));
    }

    @Override
    public List<InterviewSlotDto> getAll() {
        return interviewSlotRepository.findAll().stream()
                .map(interviewSlotMapper::toDto).toList();
    }

    @Override
    public void cleanupOldSlots() {
        interviewSlotRepository.deleteByStartDateBefore(LocalDateTime.now().minusDays(1));
    }

}
