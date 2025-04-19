package www.antholim.co.Backend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@ConfigurationProperties(prefix = "token")
@Component
public class TokenConfigProperties {
    private String tokenName;
    private String secret;
    private long exp;
}
