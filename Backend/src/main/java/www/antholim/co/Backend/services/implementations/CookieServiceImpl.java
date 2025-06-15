package www.antholim.co.Backend.services.implementations;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import www.antholim.co.Backend.config.CookieConfigProperties;
import www.antholim.co.Backend.config.RtConfigProperties;
import www.antholim.co.Backend.config.TokenConfigProperties;
import www.antholim.co.Backend.dto.response.AuthenticationResponse;
import www.antholim.co.Backend.enums.TokenType;
import www.antholim.co.Backend.services.CookieService;

import java.util.Arrays;

@Service
public class CookieServiceImpl implements CookieService {

    private final TokenConfigProperties tokenConfigProperties;
    private final RtConfigProperties rtConfigProperties;
    private final CookieConfigProperties cookieConfigProperties;

    public CookieServiceImpl(TokenConfigProperties tokenConfigProperties, RtConfigProperties rtConfigProperties, CookieConfigProperties cookieConfigProperties) {
        this.tokenConfigProperties = tokenConfigProperties;
        this.rtConfigProperties = rtConfigProperties;
        this.cookieConfigProperties = cookieConfigProperties;
    }
    @Override
    public String getTokenFromCookie(HttpServletRequest request, String cookieName) {
        System.out.println(cookieName);
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                System.out.println(cookie.getName() + ": " + cookie.getValue());
                if (cookieName.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
    @Override
    public void clearTokenCookie(HttpServletResponse response) {

    }


    @Override
    public void addTokenCookie(HttpServletResponse response, String token, TokenType tokenType, String cookieName) {

        long maxAge = tokenType == TokenType.ACCESS_TOKEN ?
                tokenConfigProperties.getExp() : rtConfigProperties.getExp();

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
        addTokenCookie(response, res.getToken(), TokenType.ACCESS_TOKEN, "authToken");
        addTokenCookie(response, res.getToken(), TokenType.REFRESH_TOKEN, "refreshToken");
    }

    @Override
    public void clearTokenCookies(HttpServletResponse response) {

    }
}
