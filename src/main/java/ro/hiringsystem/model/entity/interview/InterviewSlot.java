package ro.hiringsystem.model.entity.interview;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import ro.hiringsystem.model.abstracts.User;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewSlot {

    @Id
    private UUID id;

    private UUID userId;

    private UUID roomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "roomId", insertable = false, updatable = false)
    private InterviewConferenceRoom interviewConferenceRoom;

    private LocalDate date;

    private Integer startMinutes;

    private Integer minutesDuration;
}
