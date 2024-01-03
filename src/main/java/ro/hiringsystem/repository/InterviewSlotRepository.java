package ro.hiringsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import ro.hiringsystem.model.entity.interview.InterviewSlot;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InterviewSlotRepository extends JpaRepository<InterviewSlot, UUID> {

    @Query("SELECT is FROM InterviewSlot is WHERE is.id = :id")
    Optional<InterviewSlot> findById(UUID id);

    @Query("SELECT is FROM InterviewSlot is WHERE is.userId = :userId")
    List<InterviewSlot> findAllByUserId(UUID userId);

    @Query("SELECT is FROM InterviewSlot is WHERE is.roomId = :roomId")
    List<InterviewSlot> findAllByRoomId(UUID roomId);

    @Query("SELECT is FROM InterviewSlot is WHERE is.date = :date")
    List<InterviewSlot> findAllByDate(LocalDate date);

    @Transactional
    @Modifying
    @Query("DELETE FROM InterviewSlot is WHERE is.date <= :dateTime AND is.startMinutes < :startMinutes")
    void deleteByStartDateBefore(LocalDate dateTime, Integer startMinutes);
}
