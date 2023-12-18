package ro.hiringsystem.model.dto.interview;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
public class InterviewFileUploadedDto {
    private UUID id;

    private LocalDateTime uploadedTime;

    private UUID userId;

    private UUID interviewRoomId;

    private String fileName;

    private String mediaType;

    private byte[] file;
}
