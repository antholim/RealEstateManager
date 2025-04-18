package www.antholim.co.Backend.services;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import www.antholim.co.Backend.dto.response.AuthenticationResponse;

public interface CookieService {
    String getTokenFromCookie(HttpServletRequest request, String tokenName);
    void clearTokenCookie(HttpServletResponse response);
    void addTokenCookie(HttpServletResponse response, String token);
    void addTokenCookies(HttpServletResponse response, AuthenticationResponse res);
    void clearTokenCookies(HttpServletResponse response);
}
