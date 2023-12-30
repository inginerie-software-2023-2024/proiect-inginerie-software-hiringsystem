package ro.hiringsystem.model.entity.interview;

import jakarta.persistence.*;
import lombok.*;
import ro.hiringsystem.model.entity.JobApplication;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewConferenceRoom {

    @Id
    private UUID id;

    private LocalDateTime startDate;

    private LocalDateTime creationDate;

    @Column(name = "application_id")
    private UUID applicationId;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "application_id", referencedColumnName = "id", insertable = false, updatable = false)
    private JobApplication jobApplication;

    @OneToMany(mappedBy = "interviewRoom", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InterviewParticipant> participants;
}
