package www.antholim.co.Backend.services.implementations;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import www.antholim.co.Backend.dto.response.AuthenticationResponse;
import www.antholim.co.Backend.services.CookieService;

import java.util.Arrays;

public class CookieServiceImpl implements CookieService {
    @Override
    public String getTokenFromCookie(HttpServletRequest request, String tokenName) {
        if (request.getCookies() == null) return null;

        return Arrays.stream(request.getCookies())
                .filter(cookie -> tokenName.equals(cookie.getName()))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);
    }

    @Override
    public void clearTokenCookie(HttpServletResponse response) {

    }

    @Override
    public void addTokenCookie(HttpServletResponse response, String token) {

    }

    @Override
    public void addTokenCookies(HttpServletResponse response, AuthenticationResponse res) {

    }

    @Override
    public void clearTokenCookies(HttpServletResponse response) {

    }
}
