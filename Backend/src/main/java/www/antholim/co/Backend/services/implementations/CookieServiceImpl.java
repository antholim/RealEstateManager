package www.antholim.co.Backend.services.implementations;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import www.antholim.co.Backend.config.CookieConfigProperties;
import www.antholim.co.Backend.config.RtConfigProperties;
import www.antholim.co.Backend.config.TokenConfigProperties;
import www.antholim.co.Backend.dto.response.AuthenticationResponse;
import www.antholim.co.Backend.enums.TokenType;
import www.antholim.co.Backend.services.CookieService;

import java.util.Arrays;

public class CookieServiceImpl implements CookieService {

    private TokenConfigProperties tokenConfigProperties;
    private RtConfigProperties rtConfigProperties;
    private CookieConfigProperties cookieConfigProperties;
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
    public void addTokenCookie(HttpServletResponse response, String token, TokenType tokenType) {

        long maxAge = tokenType == TokenType.ACCESS_TOKEN ?
                tokenConfigProperties.getExp() : rtConfigProperties.getExp();
        String cookieName = tokenType == TokenType.ACCESS_TOKEN ?
                tokenConfigProperties.getTokenName() : rtConfigProperties.getTokenName();

        ResponseCookie cookie = ResponseCookie.from(cookieName, token)
                .httpOnly(cookieConfigProperties.isHttpOnly())
                .secure(cookieConfigProperties.isSecure())
                .path("/")
                .maxAge(maxAge)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    @Override
    public void addTokenCookies(HttpServletResponse response, AuthenticationResponse res) {
        addTokenCookie(response, res.getToken(), TokenType.ACCESS_TOKEN);
        addTokenCookie(response, res.getToken(), TokenType.REFRESH_TOKEN);
    }

    @Override
    public void clearTokenCookies(HttpServletResponse response) {

    }
}
