package www.antholim.co.Backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import www.antholim.co.Backend.dto.model.TenantDto;
import www.antholim.co.Backend.dto.request.TenantRequestDto;
import www.antholim.co.Backend.dto.response.Response;
import www.antholim.co.Backend.exceptions.custom.ResourceNotFoundException;
import www.antholim.co.Backend.services.CookieService;
import www.antholim.co.Backend.services.TenantService;
import www.antholim.co.Backend.services.TokenService;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class TenantController {
    private final TenantService tenantService;
    private final TokenService tokenService;
    private final CookieService cookieService;

    @GetMapping("/api/v1/tenant")
    public Response<?> getTenants(HttpServletRequest request) {
        String jwt = cookieService.getTokenFromCookie(request, "authToken");
        if (jwt == null) {
            return Response.error(Response.Status.UNAUTHORIZED,"Authentication required");
        }
        Long userId = tokenService.extractUserId(jwt);
        List<TenantDto> tenants = tenantService.getTenants(userId)
                .orElseThrow(() -> new ResourceNotFoundException("No tenants found"));
        return Response.ok().setPayload(tenants);
    }

    @PostMapping("/api/v1/tenant")
    public Response<?> createTenant(@RequestBody TenantRequestDto tenantRequestDto, HttpServletRequest request) {
        tenantService.createTenant(tenantRequestDto);
        return Response.created().setPayload(tenantRequestDto);
    }
}
