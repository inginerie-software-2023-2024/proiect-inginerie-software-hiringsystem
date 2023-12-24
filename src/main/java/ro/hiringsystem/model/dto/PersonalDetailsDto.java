package ro.hiringsystem.model.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PersonalDetailsDto {

    @JsonProperty("firstName")
    private String firstName;

    @JsonProperty("lastName")
    private String lastName;

    @JsonProperty("githubProfileLink")
    private URL githubProfileLink;

    @JsonProperty("linkedInProfileLink")
    private URL linkedInProfileLink;

    @JsonProperty("primaryEmail")
    private String primaryEmail;

    @JsonProperty("emails")
    private List<String> mailList;

    @JsonProperty("phoneNumbers")
    private List<String> phoneNumberList;

    @JsonProperty("skills")
    private List<String> skills;
}
