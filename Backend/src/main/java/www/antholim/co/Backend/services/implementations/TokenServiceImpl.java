package www.antholim.co.Backend.services.implementations;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import www.antholim.co.Backend.config.RtConfigProperties;
import www.antholim.co.Backend.config.TokenConfigProperties;
import www.antholim.co.Backend.enums.TokenType;
import www.antholim.co.Backend.services.TokenService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;


import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@Slf4j
public class TokenServiceImpl implements TokenService {

    private final TokenConfigProperties tokenConfigProperties;
    private final RtConfigProperties rtConfigProperties;
    private SecretKey signInKey;
    private SecretKey refreshKey;

    public TokenServiceImpl(TokenConfigProperties tokenConfigProperties, RtConfigProperties rtConfigProperties) {
        if (tokenConfigProperties.getSecret() == null || rtConfigProperties.getSecret() == null) {
            throw new IllegalArgumentException("Secret properties cannot be null!");
        }
        this.tokenConfigProperties = tokenConfigProperties;
        this.rtConfigProperties = rtConfigProperties;
    }

    @PostConstruct
    public void initializeKeys() {
        try {
            log.debug("Initializing JWT keys...");

            this.signInKey = createKey(tokenConfigProperties.getSecret());
            this.refreshKey = createKey(rtConfigProperties.getSecret());

            log.info("JWT keys initialized successfully");
        } catch (Exception e) {
            log.error("Failed to initialize JWT keys: {}", e.getMessage());
            throw new RuntimeException("Failed to initialize JWT keys", e);
        }
    }

    private SecretKey createKey(String secret) {
        try {
            // Try standard Base64 first
            return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
        } catch (Exception e) {
            log.warn("Standard Base64 decoding failed, trying URL-safe Base64...");
            try {
                return Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(secret));
            } catch (Exception e2) {
                log.error("Both Base64 decodings failed for secret");
                throw new RuntimeException("Invalid Base64 secret: " + e2.getMessage(), e2);
            }
        }
    }

    private SecretKey getKey(TokenType tokenType) {
        return tokenType == TokenType.ACCESS_TOKEN ? signInKey : refreshKey;
    }

    private Claims extractAllClaims(String token, TokenType tokenType) {
        return Jwts.parser()
                .verifyWith(getKey(tokenType))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver, TokenType tokenType) {
        final Claims claims = extractAllClaims(token, tokenType);
        return claimsResolver.apply(claims);
    }

    @Override
    public String extractUsername(String token) {
        return extractUsername(token, TokenType.ACCESS_TOKEN);
    }

    @Override
    public String extractUsername(String token, TokenType tokenType) {
        return extractClaim(token, Claims::getSubject, tokenType);
    }

    @Override
    public String generateToken(UserDetails userDetails, TokenType tokenType) {
        return generateToken(new HashMap<>(), userDetails, tokenType);
    }

    public String generateToken(Map<String, Object> claims, UserDetails userDetails, TokenType tokenType) {
        long expirationTimeLong = (tokenType == TokenType.ACCESS_TOKEN)
                ? tokenConfigProperties.getExp() * 1000
                : rtConfigProperties.getExp() * 1000;

        final Date createdDate = new Date();
        final Date expirationDate = new Date(createdDate.getTime() + expirationTimeLong);

        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(createdDate)
                .expiration(expirationDate)
                .signWith(getKey(tokenType), Jwts.SIG.HS256)
                .compact();
    }

    @Override
    public boolean isTokenExpired(String token, TokenType tokenType) {
        return extractExpiration(token, tokenType).before(new Date());
    }

    @Override
    public Date extractExpiration(String token, TokenType tokenType) {
        return extractClaim(token, Claims::getExpiration, tokenType);
    }

    public boolean isTokenValid(String token, UserDetails userDetails, TokenType tokenType) {
        final String username = extractUsername(token, tokenType);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token, tokenType));
    }
}