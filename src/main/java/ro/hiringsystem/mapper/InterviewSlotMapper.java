package ro.hiringsystem.mapper;

import org.mapstruct.Mapper;
import ro.hiringsystem.model.auxiliary.AcademicExperience;
import ro.hiringsystem.model.dto.cv.AcademicExperienceDto;
import ro.hiringsystem.model.dto.interview.InterviewSlotDto;
import ro.hiringsystem.model.entity.interview.InterviewSlot;

@Mapper
public interface InterviewSlotMapper {

    InterviewSlotDto toDto(InterviewSlot interviewSlot);

    InterviewSlot toEntity(InterviewSlotDto interviewSlotDto);
}
