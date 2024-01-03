package ro.hiringsystem.model.dto.interview;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
public class InterviewSlotDto {
    private UUID id;

    private UUID userId;

    private UUID roomId;

    private LocalDate date;

    private Integer startMinutes;

    private Integer minutesDuration;
}
