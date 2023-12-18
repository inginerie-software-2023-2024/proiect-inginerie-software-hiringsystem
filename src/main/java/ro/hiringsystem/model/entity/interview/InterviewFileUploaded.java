package ro.hiringsystem.model.entity.interview;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewFileUploaded {
    @Id
    private UUID id;

    @NonNull
    private LocalDateTime uploadedTime;

    @NonNull
    private UUID userId;

    @NonNull
    private UUID interviewRoomId;

    @NonNull
    private String fileName;

    @NonNull
    private String mediaType;

    @Lob
    private byte[] file;
}
