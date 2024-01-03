package ro.hiringsystem.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ro.hiringsystem.model.dto.JobDto;
import ro.hiringsystem.model.enums.JobType;
import ro.hiringsystem.model.enums.Position;
import ro.hiringsystem.service.JobService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/job")
@RequiredArgsConstructor
public class JobsController {

    private final JobService jobService;

    @GetMapping("/get")
    public ResponseEntity<JobDto> get(@RequestParam(required = true) UUID id) {
        return ResponseEntity.ok(jobService.getById(id));
    }

    @GetMapping("/get/all")
    public ResponseEntity<Object> getAllJobs() {
        return ResponseEntity.ok(jobService.getAll());
    }

    @GetMapping("/get/all/paginated")
    public ResponseEntity<List<JobDto>> getAllJobs(@RequestParam Integer page, @RequestParam Integer size) {
        if(page <= 0)
            page = 1;

        return ResponseEntity.ok(jobService.getAll(page-1, size));
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<JobDto> create (@RequestBody JobDto jobDto) {
        jobDto.setId(UUID.randomUUID());
        return ResponseEntity.ok(jobService.createEdit(jobDto));
    }

    @PostMapping("/edit")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<JobDto> edit(
            @RequestParam(required = true) UUID id,
            @RequestBody JobDto jobDto
    ) {
        jobDto.setId(id);
        return ResponseEntity.ok(jobService.createEdit(jobDto));
    }

    @PostMapping("/delete")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<JobDto> delete(@RequestParam(required = true) UUID id) {
        jobService.removeElementById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/types")
    public ResponseEntity<JobType[]> getAllJobTypes() {
        JobType[] jobTypes = JobType.values();
        return ResponseEntity.ok(jobTypes);
    }

    @GetMapping("/positions")
    public ResponseEntity<Position[]> getAllPositions() {
        Position[] positions = Position.values();
        return ResponseEntity.ok(positions);
    }
}
