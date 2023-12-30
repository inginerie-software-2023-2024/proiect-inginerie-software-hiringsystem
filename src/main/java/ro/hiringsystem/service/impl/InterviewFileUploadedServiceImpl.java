package ro.hiringsystem.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.hiringsystem.mapper.InterviewFileUploadedMapper;
import ro.hiringsystem.model.dto.interview.InterviewFileUploadedDto;
import ro.hiringsystem.model.entity.interview.InterviewFileUploaded;
import ro.hiringsystem.repository.InterviewFileUploadedRepository;
import ro.hiringsystem.service.InterviewFileUploadedService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class InterviewFileUploadedServiceImpl implements InterviewFileUploadedService {
    private final InterviewFileUploadedRepository interviewFileUploadedRepository;
    private final InterviewFileUploadedMapper interviewFileUploadedMapper;

    @Override
    public InterviewFileUploadedDto getById(UUID id) {
        Optional<InterviewFileUploaded> interviewFileUploaded = interviewFileUploadedRepository.findById(id);

        if(interviewFileUploaded.isEmpty()) {
            throw new RuntimeException("File not found!");
        }

        return interviewFileUploadedMapper.toDto(interviewFileUploaded.get());
    }

    @Override
    public UUID uploadFile(UUID roomId, UUID userId, String fileName, String mediaType, byte[] fileData) {
        try {
            UUID fileId = UUID.randomUUID();
            InterviewFileUploaded fileUploaded = InterviewFileUploaded.builder()
                    .id(UUID.randomUUID())
                    .uploadedTime(LocalDateTime.now())
                    .userId(userId)
                    .interviewRoomId(roomId)
                    .fileName(fileName)
                    .mediaType(mediaType)
                    .file(fileData)
                    .build();

            interviewFileUploadedRepository.save(fileUploaded);

            return fileId;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public List<InterviewFileUploadedDto> getAllByRoomIdUserId(UUID roomId, UUID userId) {
        return interviewFileUploadedRepository.findAllByRoomIdUserId(roomId, userId).stream()
                .map(interviewFileUploadedMapper::toDto).toList();
    }
}
