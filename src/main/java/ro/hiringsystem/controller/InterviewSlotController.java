package ro.hiringsystem.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Object> createInterviewSlot(@RequestBody InterviewSlotDto interviewSlotDto) throws Exception {
        Integer start = interviewSlotDto.getStartMinutes();
        LocalDate date = interviewSlotDto.getDate();
        Boolean overlap = interviewSlotService.getAllGroupedByDate().get(date).stream()
                .anyMatch(slot -> (slot.getStartMinutes() <= start && start <= slot.getStartMinutes() + slot.getMinutesDuration()));
        if (!overlap){
            interviewSlotDto.setId(UUID.randomUUID());
            return ResponseEntity.ok(interviewSlotService.create(interviewSlotDto));
        }
        else{
            Exception e = new RuntimeException("The slot can't be placed overlapping with another slot");
            throw(e);
        }
    }

    @PostMapping("delete/{id}")
    public ResponseEntity<Object> deleteInterviewSlot(@PathVariable("id") UUID id){
        if(interviewSlotService.deleteById(id))
            return ResponseEntity.ok().build();
        else
            return ResponseEntity.notFound().build();
    }

    @GetMapping("available/room/{id}")
    public ResponseEntity<Object> getAvailableInterviewSlotsByRoomId(@PathVariable("id") UUID id){
        return ResponseEntity.ok(interviewSlotService.getAllAvailableByRoomId(id));
    }

    @GetMapping("get/user/{id}")
    public ResponseEntity<Object> getInterviewSlotsByUserId(@PathVariable("id") UUID id){
        return ResponseEntity.ok(interviewSlotService.getAllFormattedForUserId(id));
    }

    @PostMapping("schedule/{slotId}/{roomId}")
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
