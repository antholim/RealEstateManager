package www.antholim.co.Backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import www.antholim.co.Backend.dto.model.PropertyDto;
import www.antholim.co.Backend.dto.model.UserDto;
import www.antholim.co.Backend.dto.model.UserResponseDto;
import www.antholim.co.Backend.dto.response.Response;
import www.antholim.co.Backend.services.PropertyService;
import www.antholim.co.Backend.services.TokenService;

@Slf4j
@Controller
@RestController
public class PropertyController {
    @Autowired
    private PropertyService propertyService;
    @Autowired
    private TokenService tokenService;
    public PropertyController() {

    }

    @PostMapping("/api/v1/property")
    public Response<?> createProperty(@RequestBody PropertyDto propertyDto, HttpServletRequest request) {
        return Response.ok();
    }

}
