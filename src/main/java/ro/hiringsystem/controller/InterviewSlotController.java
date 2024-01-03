package ro.hiringsystem.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ro.hiringsystem.model.dto.interview.InterviewConferenceRoomDto;
import ro.hiringsystem.model.dto.interview.InterviewSlotDto;
import ro.hiringsystem.service.InterviewConferenceRoomService;
import ro.hiringsystem.service.InterviewSlotService;

import java.time.LocalDate;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/slot")
@RequiredArgsConstructor
public class InterviewSlotController {

    private final InterviewSlotService interviewSlotService;

    private final InterviewConferenceRoomService interviewConferenceRoomService;

    @PostMapping("create")
    @PreAuthorize("hasAuthority('MANAGER') || hasAuthority('INTERVIEWER')")
    public ResponseEntity<Object> createInterviewSlot(@RequestBody InterviewSlotDto interviewSlotDto) throws Exception {
        Integer start = interviewSlotDto.getStartMinutes();
        UUID interviewerId = interviewSlotDto.getUserId();
        LocalDate date = interviewSlotDto.getDate();

        InterviewSlotDto slotDto = interviewSlotService.getSlotAtTime(interviewerId, date, start).orElse(null);
        boolean overlap = slotDto != null;

        if (!overlap){
            interviewSlotDto.setId(UUID.randomUUID());
            return ResponseEntity.ok(interviewSlotService.create(interviewSlotDto));
        }
        else{
            throw new RuntimeException("The slot can't be placed overlapping with another slot");
        }
    }

    @PostMapping("delete/{id}")
    @PreAuthorize("hasAuthority('MANAGER') || hasAuthority('INTERVIEWER')")
    public ResponseEntity<Object> deleteInterviewSlot(@PathVariable("id") UUID id){
        if(interviewSlotService.deleteById(id))
            return ResponseEntity.ok().build();
        else
            return ResponseEntity.notFound().build();
    }

    @GetMapping("available/room/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Object> getAvailableInterviewSlotsByRoomId(@PathVariable("id") UUID id){
        return ResponseEntity.ok(interviewSlotService.getAllAvailableByRoomId(id));
    }

    @GetMapping("get/user/{id}")
    @PreAuthorize("hasAuthority('MANAGER') || hasAuthority('INTERVIEWER')")
    public ResponseEntity<Object> getInterviewSlotsByUserId(@PathVariable("id") UUID id){
        return ResponseEntity.ok(interviewSlotService.getAllFormattedForUserId(id));
    }

    @PostMapping("schedule/{slotId}/{roomId}")
    @PreAuthorize("hasAuthority('CANDIDATE')")
    public ResponseEntity<Object> scheduleInterviewSlot(@PathVariable("slotId") UUID slotId, @PathVariable("roomId") UUID roomId){
        InterviewSlotDto interviewSlotDto = interviewSlotService.getById(slotId);
        interviewSlotDto.setRoomId(roomId);
        interviewSlotService.saveElement(interviewSlotDto);

        InterviewConferenceRoomDto interviewConferenceRoomDto = interviewConferenceRoomService.getById(roomId);
        interviewConferenceRoomDto.setStartDate(interviewSlotDto.getDate().atStartOfDay());
        interviewConferenceRoomService.saveElement(interviewConferenceRoomDto);

        return ResponseEntity.ok().build();
    }
}
