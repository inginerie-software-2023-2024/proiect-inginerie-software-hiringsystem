package ro.hiringsystem.seeders;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(value = "app.data.seeding.enabled", havingValue = "true")
@RequiredArgsConstructor
public class SeederManager {

    private final InterviewConferenceRoomSeeder interviewConferenceRoomSeeder;
    private final UserSeeder userSeeder;
    private final JobSeeder jobSeeder;
    private final JobApplicationSeeder jobApplicationSeeder;
    private final InterviewSlotSeeder interviewSlotSeeder;

    @PostConstruct
    public void seedData(){
        try {
            userSeeder.seedData();
            interviewConferenceRoomSeeder.seedData();
            jobSeeder.seedData();
            jobApplicationSeeder.seedData();
            interviewSlotSeeder.seedData();
        }catch (JpaSystemException e){
            System.out.println("Could not seed data, maybe it already exists?");
        }
    }
}
