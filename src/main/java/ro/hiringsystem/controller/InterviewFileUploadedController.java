package ro.hiringsystem.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ro.hiringsystem.model.dto.interview.InterviewFileUploadedDto;
import ro.hiringsystem.service.InterviewFileUploadedService;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/interview/files")
@RequiredArgsConstructor
public class InterviewFileUploadedController {
    private final InterviewFileUploadedService interviewFileUploadedService;

    @PostMapping("upload/{roomId}/{userId}")
    public ResponseEntity<Object> uploadFile(@PathVariable("roomId") UUID roomId, @PathVariable("userId") UUID userId, @RequestParam("file") MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();
            String mediaType = MediaTypeFactory.getMediaType(file.getResource()).orElse(MediaType.APPLICATION_OCTET_STREAM).toString();

            byte[] fileData = file.getBytes();

            interviewFileUploadedService.uploadFile(roomId, userId, fileName, mediaType, fileData);

            return ResponseEntity.ok().build();
        }  catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("{fileId}")
    public ResponseEntity<byte[]> getFile(@PathVariable UUID fileId) {
        try {
            InterviewFileUploadedDto interviewFileUploadedDto = interviewFileUploadedService.getById(fileId);
            byte[] fileContent = interviewFileUploadedDto.getFile();

            HttpHeaders headers = new HttpHeaders();

            headers.setContentDisposition(ContentDisposition.attachment().filename(interviewFileUploadedDto.getFileName()).build());
            headers.setContentType(MediaType.valueOf(interviewFileUploadedDto.getMediaType()));

            return new ResponseEntity<>(fileContent, headers, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
