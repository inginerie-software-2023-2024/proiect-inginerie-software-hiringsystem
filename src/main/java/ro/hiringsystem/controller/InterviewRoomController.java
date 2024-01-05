package ro.hiringsystem.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ro.hiringsystem.model.dto.UserDto;
import ro.hiringsystem.model.dto.interview.InterviewConferenceRoomDto;
import ro.hiringsystem.model.dto.interview.InterviewParticipantDto;
import ro.hiringsystem.model.dto.interview.InterviewParticipantExtraUserInfoDto;
import ro.hiringsystem.model.dto.interview.messaging.InterviewForceAction;
import ro.hiringsystem.service.EmailSenderService;
import ro.hiringsystem.service.InterviewConferenceRoomService;
import ro.hiringsystem.service.InterviewManagerService;
import ro.hiringsystem.service.UserService;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/interview")
@RequiredArgsConstructor
public class InterviewRoomController {
    private final InterviewConferenceRoomService interviewConferenceRoomService;
    private final InterviewManagerService interviewManagerService;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final EmailSenderService emailSenderService;
    private final UserService<UserDto> userService;

    @PostMapping("create")
    @PreAuthorize("hasAuthority('MANAGER') || hasAuthority('INTERVIEWER')")
    public ResponseEntity<InterviewConferenceRoomDto> createInterviewRoom(@RequestBody InterviewConferenceRoomDto interviewConferenceRoomDto){
        interviewConferenceRoomDto.setId(UUID.randomUUID());

        for(InterviewParticipantDto participantDto : interviewConferenceRoomDto.getParticipants()){
            if(!participantDto.getIsRoomModerator()) {
                try {
                    UserDto userDto = userService.getById(participantDto.getUserId());

                    String toEmail = userDto.getPrimaryEmail();
                    String applicantName = userDto.getFirstName();

                    emailSenderService.sendInterviewCreationEmail(toEmail,
                            applicantName,
                            interviewConferenceRoomDto.getId().toString()
                    );
                }catch(Exception x){
                    x.printStackTrace();
                }
            }
        }

        return ResponseEntity.ok(interviewConferenceRoomService.create(interviewConferenceRoomDto));
    }

    @GetMapping("get/all")
    @PreAuthorize("hasAuthority('MANAGER') || hasAuthority('INTERVIEWER')")
    public ResponseEntity<Object> getAllInterviewRooms(){
        return ResponseEntity.ok(interviewConferenceRoomService.getAll());
    }

    @GetMapping("get/{id}")
    @PreAuthorize("hasAuthority('MANAGER') || hasAuthority('INTERVIEWER')")
    public ResponseEntity<InterviewConferenceRoomDto> getInterviewRoom(@PathVariable("id") UUID id){
        return ResponseEntity.ok(interviewConferenceRoomService.getByIdFullyLoaded(id));
    }

    @PostMapping("edit/{id}")
    @PreAuthorize("hasAuthority('MANAGER') || hasAuthority('INTERVIEWER')")
    public ResponseEntity<InterviewConferenceRoomDto> editInterviewRoom(@PathVariable("id") UUID id, @RequestBody InterviewConferenceRoomDto interviewConferenceRoomDto){
        interviewConferenceRoomDto.setId(id);

        interviewManagerService.clearCacheRoom(id);
        interviewConferenceRoomService.saveElement(interviewConferenceRoomDto);

        return ResponseEntity.ok().build();
    }

    @PostMapping("delete/{id}")
    @PreAuthorize("hasAuthority('MANAGER') || hasAuthority('INTERVIEWER')")
    public ResponseEntity<Object> deleteInterviewRoom(@PathVariable("id") UUID id){
        if(interviewConferenceRoomService.deleteById(id))
            return ResponseEntity.ok().build();
        else
            return ResponseEntity.notFound().build();
    }

    @PostMapping("getParticipantInfo/{roomId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Object> getParticipantInfo(@PathVariable("roomId") UUID roomId, Authentication authentication){
        UserDto userDto = (UserDto) authentication.getPrincipal();

        InterviewParticipantExtraUserInfoDto participantInfo = interviewConferenceRoomService.getParticipantInfo(roomId, userDto.getId());
        return ResponseEntity.ok(participantInfo);
    }

    @GetMapping("getUntilStart/{roomId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Object> getUntilStart(@PathVariable("roomId") UUID roomId){
        Long untilStart = interviewManagerService.untilRoomAvailable(roomId);

        if(untilStart==null)
            return ResponseEntity.notFound().build();
        else
            return ResponseEntity.ok(untilStart);
    }

    @PostMapping("closeRoom/{roomId}")
    @PreAuthorize("hasAuthority('MANAGER') || hasAuthority('INTERVIEWER')")
    public ResponseEntity<Object> closeRoom(@PathVariable("roomId") UUID roomId){
        interviewManagerService.closeInterviewRoom(roomId);
        simpMessagingTemplate.convertAndSend("/interview/room/close/" + roomId, roomId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("forceAction/{roomId}/{userId}")
    @PreAuthorize("hasAuthority('MANAGER') || hasAuthority('INTERVIEWER')")
    public ResponseEntity<Object> forceAction(@PathVariable("roomId") UUID roomId, @PathVariable("userId") UUID userId, @RequestBody InterviewForceAction payload){
        simpMessagingTemplate.convertAndSendToUser(userId.toString(), "/interview/room/force-action", payload);
        return ResponseEntity.ok().build();
    }

    @GetMapping("get/all/my")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Object> getMyInterviewRooms(Authentication authentication){
        return ResponseEntity.ok(interviewConferenceRoomService.getAllByUserId(((UserDto) authentication.getPrincipal()).getId()));
    }
}
