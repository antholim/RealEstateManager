package www.antholim.co.Backend.dto.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors
@NoArgsConstructor
@AllArgsConstructor
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDto {
    private String username;
    private String password;
    private String email;
}
