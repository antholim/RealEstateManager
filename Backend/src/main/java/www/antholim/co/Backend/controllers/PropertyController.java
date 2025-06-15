package www.antholim.co.Backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import www.antholim.co.Backend.dto.model.PropertyDto;
import www.antholim.co.Backend.dto.response.Response;
import www.antholim.co.Backend.models.Property;
import www.antholim.co.Backend.services.CookieService;
import www.antholim.co.Backend.services.PropertyService;
import www.antholim.co.Backend.services.TokenService;

@Slf4j
@Controller
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


    @PostMapping("/api/v1/property")
    public Response<?> createProperty(@RequestBody PropertyDto propertyDto, HttpServletRequest request) {
        // Extract JWT from HTTP-only cookie
        String jwt = cookieService.getTokenFromCookie(request, "authToken");
        if (jwt == null) {
            return Response.error(Response.Status.UNAUTHORIZED,"Authentication required");
        }

        // Extract userId from JWT
        Long userId = tokenService.extractUserId(jwt);
        System.out.println(userId);
        // Create property with userId
        Property property = propertyService.createProperty(propertyDto, userId);

        return Response.ok().setPayload(property);
    }

}
