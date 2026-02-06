package www.antholim.co.Backend.services;

import org.springframework.security.core.userdetails.UserDetails;
import www.antholim.co.Backend.enums.TokenType;
import java.util.Date;
import java.util.UUID;

public interface TokenService {
    String extractUsername(String token);
    String extractUsername(String token, TokenType tokenType);
    boolean isTokenValid(String token, UserDetails userDetails, TokenType tokenType);
    String generateToken(UUID userId,UserDetails userDetails, TokenType tokenType);
    boolean isTokenExpired(String token, TokenType tokenType);
    Date extractExpiration(String token, TokenType tokenType);
    UUID extractUserId(String token);
    UUID extractUserId(String token, TokenType tokenType);

}
