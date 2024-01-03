package ro.hiringsystem.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import ro.hiringsystem.model.auxiliary.CV;

import java.net.URL;
import java.util.Collection;
import java.util.List;

@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CandidateUserDto extends UserDto {

    @JsonIgnore
    private CV cv;

    private URL githubProfileLink;

    private URL linkedInProfileLink;

    @JsonIgnore
    private List<JobApplicationDto> jobApplications;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("CANDIDATE"));
    }

}
