package www.antholim.co.Backend.services;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import www.antholim.co.Backend.dto.response.AuthenticationResponse;
import www.antholim.co.Backend.enums.TokenType;

public interface CookieService {
    String getTokenFromCookie(HttpServletRequest request, String tokenName);
    void clearTokenCookie(HttpServletResponse response);
    void addTokenCookie(HttpServletResponse response, String token, TokenType type, String cookieName);
    void addTokenCookies(HttpServletResponse response, AuthenticationResponse res);
    void clearTokenCookies(HttpServletResponse response);
}
