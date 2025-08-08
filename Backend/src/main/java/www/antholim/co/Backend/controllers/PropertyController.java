package www.antholim.co.Backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import www.antholim.co.Backend.dto.model.PropertyDto;
import www.antholim.co.Backend.dto.request.PropertyRequestDto;
import www.antholim.co.Backend.dto.response.Response;
import www.antholim.co.Backend.dto.summary.PropertySummaryDto;
import www.antholim.co.Backend.services.CookieService;
import www.antholim.co.Backend.services.PropertyService;
import www.antholim.co.Backend.services.TokenService;

import java.util.List;

@Slf4j
@RestController
public class PropertyController {
    private final PropertyService propertyService;
    private final TokenService tokenService;
    private final CookieService cookieService;

    public PropertyController(PropertyService propertyService, TokenService tokenService, CookieService cookieService) {
        this.propertyService = propertyService;
        this.tokenService = tokenService;
        this.cookieService = cookieService;
    }
    @GetMapping("/api/v1/property")
    public Response<?> getProperty(HttpServletRequest request) {
        String jwt = cookieService.getTokenFromCookie(request, "authToken");
        if (jwt == null) {
            return Response.error(Response.Status.UNAUTHORIZED,"Authentication required");
        }
        Long userId = tokenService.extractUserId(jwt);
        List<PropertyDto> properties = propertyService.getProperties(userId);

        return Response.ok().setPayload(properties);
    }
    @GetMapping("/api/v1/property-summary")
    public Response<?> getPropertiesSummary(HttpServletRequest request) {
        String jwt = cookieService.getTokenFromCookie(request, "authToken");
        if (jwt == null) {
            return Response.error(Response.Status.UNAUTHORIZED,"Authentication required");
        }
        Long userId = tokenService.extractUserId(jwt);
        List<PropertySummaryDto> propertiesSummary = propertyService.getPropertiesSummary(userId);

        return Response.ok().setPayload(propertiesSummary);
    }
    @PostMapping("/api/v1/property")
    public Response<?> createProperty(@RequestBody PropertyRequestDto propertyRequestDto, HttpServletRequest request) {
        String jwt = cookieService.getTokenFromCookie(request, "authToken");
        if (jwt == null) {
            return Response.error(Response.Status.UNAUTHORIZED,"Authentication required");
        }
        Long userId = tokenService.extractUserId(jwt);
        log.info(propertyRequestDto.toString());
        System.out.println(propertyRequestDto.toString() + "ABDEL");
        PropertyDto property = propertyService.createProperty(propertyRequestDto, userId);
        return Response.ok().setPayload(property);
    }

}
