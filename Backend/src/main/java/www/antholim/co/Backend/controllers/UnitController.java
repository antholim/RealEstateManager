package www.antholim.co.Backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import www.antholim.co.Backend.dto.model.PropertyDto;
import www.antholim.co.Backend.dto.model.UnitDto;
import www.antholim.co.Backend.dto.request.CreateUnitRequest;
import www.antholim.co.Backend.dto.request.UnitRequestDto;
import www.antholim.co.Backend.dto.response.Response;
import www.antholim.co.Backend.services.CookieService;
import www.antholim.co.Backend.services.TokenService;
import www.antholim.co.Backend.services.UnitService;

@Slf4j
@RestController
public class UnitController {
    private final TokenService tokenService;
    private final CookieService cookieService;
    private final UnitService unitService;

    public UnitController(TokenService tokenService, CookieService cookieService, UnitService unitService) {
        this.tokenService = tokenService;
        this.cookieService = cookieService;
        this.unitService = unitService;
    }

    @PostMapping("/api/v1/unit")
    public Response<?> addUnitToProperty(@RequestBody UnitRequestDto unitDto, HttpServletRequest request) {
        String jwt = cookieService.getTokenFromCookie(request, "authToken");
        if (jwt == null) {
            return Response.error(Response.Status.UNAUTHORIZED,"Authentication required");
        }
        Long userId = tokenService.extractUserId(jwt);
        //Check if property belongs to userId
        UnitDto unit = unitService.createUnit(unitDto, unitDto.getPropertyId());
        return Response.ok().setPayload(unit);
    }
}
