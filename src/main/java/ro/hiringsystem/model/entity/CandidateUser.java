package ro.hiringsystem.model.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import ro.hiringsystem.model.abstracts.User;
import ro.hiringsystem.model.auxiliary.CV;
import ro.hiringsystem.model.dto.PersonalDetailsDto;

import java.net.URL;
import java.util.List;

@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CandidateUser extends User {

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private CV cv;

    private URL githubProfileLink;

    private URL linkedInProfileLink;

    @OneToMany(mappedBy = "candidateUserId", fetch=FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
    private List<JobApplication> jobApplications;

    @Override
    public String toString() {
        return "CandidateUser{" +
                "cv=" + cv +
                ", githubProfileLink=" + githubProfileLink +
                ", linkedInProfileLink=" + linkedInProfileLink +
                '}'+super.toString();
    }

    public void setPersonalDetails(PersonalDetailsDto personalDetailsDto) {
        this.setFirstName(personalDetailsDto.getFirstName());
        this.setLastName(personalDetailsDto.getLastName());
        this.setGithubProfileLink(personalDetailsDto.getGithubProfileLink());
        this.setLinkedInProfileLink(personalDetailsDto.getLinkedInProfileLink());
        this.setPrimaryEmail(personalDetailsDto.getPrimaryEmail());
        this.setMailList(personalDetailsDto.getMailList());
        this.setPhoneNumberList(personalDetailsDto.getPhoneNumberList());
        CV cv = this.getCv();
        cv.setSkills(personalDetailsDto.getSkills());
        this.setCv(cv);
    }
}
