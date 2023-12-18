package ro.hiringsystem.mapper;

import org.mapstruct.Mapper;
import ro.hiringsystem.model.dto.interview.InterviewFileUploadedDto;
import ro.hiringsystem.model.entity.interview.InterviewFileUploaded;

@Mapper
public interface InterviewFileUploadedMapper {
    InterviewFileUploaded toEntity(InterviewFileUploadedDto dto);

    InterviewFileUploadedDto toDto(InterviewFileUploaded entity);
}
