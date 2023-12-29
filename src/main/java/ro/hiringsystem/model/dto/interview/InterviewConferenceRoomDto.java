package ro.hiringsystem.model.dto.interview;

import lombok.Getter;
import lombok.Setter;
import ro.hiringsystem.model.dto.JobApplicationDto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class InterviewConferenceRoomDto {
    private UUID id;

    private LocalDateTime startDate;

    private LocalDateTime creationDate;

    private JobApplicationDto jobApplication;

    private List<InterviewParticipantDto> participants;
}
