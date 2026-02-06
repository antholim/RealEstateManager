package www.antholim.co.Backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import www.antholim.co.Backend.dto.response.Response;
import www.antholim.co.Backend.dto.summary.DashboardSummaryDto;
import www.antholim.co.Backend.services.CookieService;
import www.antholim.co.Backend.services.DashboardService;
import www.antholim.co.Backend.services.TokenService;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/dashboard")
public class DashboardController {
    private final DashboardService dashboardService;
    private final TokenService tokenService;
    private final CookieService cookieService;

    @GetMapping("/summary")
    public Response<?> getDashboardSummary(HttpServletRequest request) {
        String jwt = cookieService.getTokenFromCookie(request, "authToken");
        if (jwt == null) {
            return Response.error(Response.Status.UNAUTHORIZED, "Authentication required");
        }
        UUID userId = tokenService.extractUserId(jwt);
        DashboardSummaryDto summary = dashboardService.getDashboardSummary(userId);
        return Response.ok().setPayload(summary);
    }
}
