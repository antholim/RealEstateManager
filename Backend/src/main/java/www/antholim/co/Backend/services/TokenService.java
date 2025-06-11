package www.antholim.co.Backend.services;

import org.springframework.security.core.userdetails.UserDetails;
import www.antholim.co.Backend.enums.TokenType;

import java.util.Date;
import java.util.Map;

public interface TokenService {
    String extractUsername(String token);
    String extractUsername(String token, TokenType tokenType);
//    <T> T extractClaim(String token, Function<Claims, T> claimsResolver, TokenType tokenType);
//    String generateToken(Map<String, Object> extraClaims, UserDetails userDetails, TokenType tokenType);
    boolean isTokenValid(String token, UserDetails userDetails, TokenType tokenType);
    String generateToken(UserDetails userDetails, TokenType tokenType);
    boolean isTokenExpired(String token, TokenType tokenType);
    Date extractExpiration(String token, TokenType tokenType);
}
