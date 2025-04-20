package www.antholim.co.Backend.services.implementations;

import org.springframework.security.core.userdetails.UserDetails;
import www.antholim.co.Backend.config.RtConfigProperties;
import www.antholim.co.Backend.config.TokenConfigProperties;
import www.antholim.co.Backend.enums.TokenType;
import www.antholim.co.Backend.services.TokenService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class TokenServiceImpl implements TokenService {

    //
    private TokenConfigProperties tokenConfigProperties;
    private RtConfigProperties rtConfigProperties;
    private Key signInKey;
    private Key refreshKey;

    public TokenServiceImpl(TokenConfigProperties tokenConfigProperties, RtConfigProperties rtConfigProperties) {
        this.tokenConfigProperties = tokenConfigProperties;
        this.rtConfigProperties = rtConfigProperties;
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
        return generateToken(new HashMap<>(), userDetails, tokenType);
    }
    public String generateToken(Map<String, Object> claims, UserDetails userDetails, TokenType tokenType) {
        long expirationTimeLong = (tokenType == TokenType.ACCESS_TOKEN)
                ? tokenConfigProperties.getExp() * 1000 // Convert seconds to milliseconds
                : rtConfigProperties.getExp() * 1000;

        final Date createdDate = new Date();
        final Date expirationDate = new Date(createdDate.getTime() + expirationTimeLong);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(createdDate)
                .setExpiration(expirationDate)
                .signWith(tokenType == TokenType.ACCESS_TOKEN ? signInKey : refreshKey, SignatureAlgorithm.HS256)
                .compact();
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
