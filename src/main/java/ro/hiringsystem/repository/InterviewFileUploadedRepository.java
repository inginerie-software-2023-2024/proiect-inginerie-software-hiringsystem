package ro.hiringsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ro.hiringsystem.model.entity.interview.InterviewFileUploaded;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InterviewFileUploadedRepository extends JpaRepository<InterviewFileUploaded, UUID> {
    @Query("SELECT f FROM InterviewFileUploaded f WHERE f.id = :id")
    Optional<InterviewFileUploaded> findById(UUID id);

    @Query("SELECT f FROM InterviewFileUploaded f WHERE f.interviewRoomId = :roomId AND f.userId = :userId")
    List<InterviewFileUploaded> findAllByRoomIdUserId(UUID roomId, UUID userId);
}
