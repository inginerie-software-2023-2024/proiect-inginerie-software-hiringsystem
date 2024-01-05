package ro.hiringsystem.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import ro.hiringsystem.model.abstracts.User;
import ro.hiringsystem.model.enums.InterviewerType;

import java.util.Collection;
import java.util.List;

@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InterviewerUserDto extends UserDto {

    private InterviewerType interviewerType;

    private String professionalBackground;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("INTERVIEWER"));
    }
}
