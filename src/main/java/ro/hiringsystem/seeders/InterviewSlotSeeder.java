package ro.hiringsystem.seeders;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import ro.hiringsystem.model.entity.interview.InterviewConferenceRoom;
import ro.hiringsystem.model.entity.interview.InterviewSlot;
import ro.hiringsystem.repository.InterviewConferenceRoomRepository;
import ro.hiringsystem.repository.InterviewSlotRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Component
@ConditionalOnProperty(value = "app.data.seeding.enabled", havingValue = "true")
@RequiredArgsConstructor
public class InterviewSlotSeeder {
    private final InterviewSlotRepository interviewSlotRepository;

    private final InterviewConferenceRoomRepository interviewConferenceRoomRepository;

    public void seedData(){
        System.out.println("Starting InterviewSlot seeding...");

        UUID slotId1 = UUID.fromString("2a6ff873-b2fd-47a6-a629-15347449b626");
        UUID userId1 = UUID.fromString("a29c5c47-2b4e-483e-93f3-ae350a22a777");
        UUID roomId1 = UUID.fromString("ce2d2a11-7759-4d9c-88f2-9e2ef29b7853");
        InterviewSlot interviewSlot1 = InterviewSlot.builder()
                .id(slotId1)
                .userId(userId1)
                .roomId(roomId1)
                .date(LocalDate.now())
                .startMinutes(LocalDateTime.now().plusMinutes(22).getHour() * 60 + LocalDateTime.now().plusMinutes(22).getMinute())
                .minutesDuration(60)
                .build();

        UUID slotId2 = UUID.fromString("a6fb5105-cef7-4e66-b37f-f67553ffbe81");
        UUID userId2 = UUID.fromString("825d3b65-ba86-41fe-b5b2-e9c67c59f868");
        UUID roomId2 = UUID.fromString("fcf343d4-1026-43cc-95e1-09762d6c7f5e");
        InterviewSlot interviewSlot2 = InterviewSlot.builder()
                .id(slotId2)
                .userId(userId2)
                .roomId(roomId2)
                .date(LocalDate.now())
                .startMinutes(LocalDateTime.now().plusMinutes(5).getHour() * 60 + LocalDateTime.now().plusMinutes(5).getMinute())
                .minutesDuration(90)
                .build();

        UUID slotId3 = UUID.fromString("3d2e6a43-471f-4845-9530-3caab73eab5d");
        UUID userId3 = UUID.fromString("825d3b65-ba86-41fe-b5b2-e9c67c59f868");
        InterviewSlot interviewSlot3 = InterviewSlot.builder()
                .id(slotId3)
                .userId(userId3)
                .date(LocalDate.now().plusDays(2))
                .startMinutes(660)
                .minutesDuration(120)
                .build();

        UUID slotId4 = UUID.fromString("6ea7f891-1cc1-477d-bc9a-a8aa762944cd");
        UUID userId4 = UUID.fromString("825d3b65-ba86-41fe-b5b2-e9c67c59f868");
        InterviewSlot interviewSlot4 = InterviewSlot.builder()
                .id(slotId4)
                .userId(userId4)
                .date(LocalDate.now().plusDays(2))
                .startMinutes(700)
                .minutesDuration(90)
                .build();

        UUID slotId5 = UUID.fromString("aa56f18b-a0ef-42d4-a506-11f0e9e26a69");
        UUID userId5 = UUID.fromString("825d3b65-ba86-41fe-b5b2-e9c67c59f868");
        InterviewSlot interviewSlot5 = InterviewSlot.builder()
                .id(slotId5)
                .userId(userId5)
                .date(LocalDate.now().plusDays(2))
                .startMinutes(760)
                .minutesDuration(60)
                .build();

        UUID slotId6 = UUID.fromString("def93965-13cb-486b-bf11-a59e7245cc3d");
        UUID userId6 = UUID.fromString("825d3b65-ba86-41fe-b5b2-e9c67c59f868");
        InterviewSlot interviewSlot6 = InterviewSlot.builder()
                .id(slotId6)
                .userId(userId6)
                .date(LocalDate.now().plusDays(4))
                .startMinutes(660)
                .minutesDuration(45)
                .build();

        UUID slotId7 = UUID.fromString("4d3dfedb-da05-41c3-b227-c1c7c0bd0e02");
        UUID userId7 = UUID.fromString("825d3b65-ba86-41fe-b5b2-e9c67c59f868");
        InterviewSlot interviewSlot7 = InterviewSlot.builder()
                .id(slotId7)
                .userId(userId7)
                .date(LocalDate.now().plusDays(4))
                .startMinutes(720)
                .minutesDuration(90)
                .build();

        UUID slotId8 = UUID.fromString("29fa96a0-b162-4037-9a4b-0a5cf7c88416");
        UUID userId8 = UUID.fromString("825d3b65-ba86-41fe-b5b2-e9c67c59f868");
        InterviewSlot interviewSlot8 = InterviewSlot.builder()
                .id(slotId8)
                .userId(userId8)
                .date(LocalDate.now().plusDays(7))
                .startMinutes(780)
                .minutesDuration(60)
                .build();

        UUID slotId9 = UUID.fromString("24217a40-b858-4001-9b29-5c47e0e5d680");
        UUID userId9 = UUID.fromString("825d3b65-ba86-41fe-b5b2-e9c67c59f868");
        InterviewSlot interviewSlot9 = InterviewSlot.builder()
                .id(slotId9)
                .userId(userId9)
                .date(LocalDate.now().plusDays(9))
                .startMinutes(720)
                .minutesDuration(75)
                .build();

        UUID slotId10 = UUID.fromString("79ca9210-11e0-4993-8d6b-8ece772008a3");
        UUID userId10 = UUID.fromString("825d3b65-ba86-41fe-b5b2-e9c67c59f868");
        InterviewSlot interviewSlot10 = InterviewSlot.builder()
                .id(slotId10)
                .userId(userId10)
                .date(LocalDate.now().plusDays(12))
                .startMinutes(660)
                .minutesDuration(120)
                .build();

        interviewSlotRepository.saveAll(List.of(interviewSlot1, interviewSlot2, interviewSlot3, interviewSlot4, interviewSlot5, interviewSlot6, interviewSlot7, interviewSlot8, interviewSlot9, interviewSlot10));
        System.out.println("InterviewSlot seeding completed.");

    }
}
