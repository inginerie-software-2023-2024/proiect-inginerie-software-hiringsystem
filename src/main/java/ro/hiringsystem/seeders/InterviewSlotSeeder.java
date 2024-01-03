package ro.hiringsystem.seeders;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import ro.hiringsystem.model.entity.interview.InterviewSlot;
import ro.hiringsystem.repository.InterviewSlotRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Component
@ConditionalOnProperty(value = "app.data.seeding.enabled", havingValue = "true")
@RequiredArgsConstructor
public class InterviewSlotSeeder {
    private final InterviewSlotRepository interviewSlotRepository;

    public void seedData(){
        System.out.println("Starting InterviewSlot seeding...");

        UUID slotId1 = UUID.fromString("2a6ff873-b2fd-47a6-a629-15347449b626");
        UUID userId1 = UUID.fromString("825d3b65-ba86-41fe-b5b2-e9c67c59f868");
        UUID roomId1 = UUID.fromString("ce2d2a11-7759-4d9c-88f2-9e2ef29b7853");
        InterviewSlot interviewSlot1 = InterviewSlot.builder()
                .id(slotId1)
                .userId(userId1)
                .roomId(roomId1)
                .date(LocalDate.now())
                .startMinutes(540)
                .minutesDuration(60)
                .build();

        UUID slotId2 = UUID.fromString("a6fb5105-cef7-4e66-b37f-f67553ffbe81");
        UUID userId2 = UUID.fromString("825d3b65-ba86-41fe-b5b2-e9c67c59f868");
        UUID roomId2 = UUID.fromString("fcf343d4-1026-43cc-95e1-09762d6c7f5e");
        InterviewSlot interviewSlot2 = InterviewSlot.builder()
                .id(slotId2)
                .userId(userId2)
                .roomId(roomId2)
                .date(LocalDate.now().plusDays(2))
                .startMinutes(660)
                .minutesDuration(90)
                .build();

        interviewSlotRepository.saveAll(List.of(interviewSlot1, interviewSlot2));
        System.out.println("InterviewSlot seeding completed.");

    }
}
