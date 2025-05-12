package www.antholim.co.Backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.lang.annotation.Documented;
import java.util.Collection;
import java.util.List;

@Entity
@Accessors(chain = true)
@Setter
@Getter
@Table(name = "user")
public class User implements UserDetails {
    @Id
    private String _id;
    private String username;
    private String password;
    private String email;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

}
