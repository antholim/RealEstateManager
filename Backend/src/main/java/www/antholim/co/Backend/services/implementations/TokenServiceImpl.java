package www.antholim.co.Backend.services.implementations;

import org.springframework.security.core.userdetails.UserDetails;
import www.antholim.co.Backend.enums.TokenType;
import www.antholim.co.Backend.services.TokenService;

import java.util.Date;

public class TokenServiceImpl implements TokenService {
    public TokenServiceImpl() {

    }

    @Override
    public String extractUsername(String token) {
        return "";
    }

    @Override
    public String extractUsername(String token, TokenType tokenType) {
        return "";
    }

    @Override
    public String generateToken(UserDetails userDetails, TokenType tokenType) {
        return "";
    }

    @Override
    public boolean isTokenExpired(String token, TokenType tokenType) {
        return false;
    }

    @Override
    public Date extractExpiration(String token, TokenType tokenType) {
        return null;
    }
}
