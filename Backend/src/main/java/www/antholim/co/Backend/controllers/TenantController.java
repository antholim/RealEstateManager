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
import www.antholim.co.Backend.services.TenantService;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class TenantController {
    private final TenantService tenantService;

    @GetMapping("/api/v1/tenant")
    public Response<?> getTenants(HttpServletRequest request) {
        List<TenantDto> tenants = tenantService.getTenants()
                .orElseThrow(() -> new ResourceNotFoundException("No tenants found"));
        return Response.ok().setPayload(tenants);
    }

    @PostMapping("/api/v1/tenant")
    public Response<?> createTenant(@RequestBody TenantRequestDto tenantRequestDto, HttpServletRequest request) {
        tenantService.createTenant(tenantRequestDto);
        return Response.created().setPayload(tenantRequestDto);
    }
}
