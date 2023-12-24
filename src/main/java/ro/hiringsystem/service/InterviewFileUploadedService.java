package ro.hiringsystem.service;

import ro.hiringsystem.model.dto.interview.InterviewFileUploadedDto;

import java.util.List;
import java.util.UUID;

public interface InterviewFileUploadedService {
    InterviewFileUploadedDto getById(UUID id);

    void uploadFile(UUID roomId, UUID userId, String fileName, String mediaType, byte[] fileData);

    List<InterviewFileUploadedDto> getAllByRoomIdUserId(UUID roomId, UUID userId);
}
