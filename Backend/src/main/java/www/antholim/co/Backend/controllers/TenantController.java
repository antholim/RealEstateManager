package www.antholim.co.Backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import www.antholim.co.Backend.dto.model.TenantDto;
import www.antholim.co.Backend.dto.response.Response;
import www.antholim.co.Backend.services.TenantService;

@RestController
@RequiredArgsConstructor
public class TenantController {
    private final TenantService tenantService;

//    @GetMapping("/api/v1/tenant")
//    public Response<?> getProperty(HttpServletRequest request) {
//        return Response.ok().setPayload(properties);
//    }
    @PostMapping("/api/v1/tenant")
    public Response<?> createProperty(@RequestBody TenantDto tenantDto, HttpServletRequest request) {
        tenantService.createTenant(tenantDto);
        return Response.created().setPayload(tenantDto);
    }
}
