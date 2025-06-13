package www.antholim.co.Backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import www.antholim.co.Backend.dto.model.PropertyDto;
import www.antholim.co.Backend.dto.model.UserDto;
import www.antholim.co.Backend.dto.model.UserResponseDto;
import www.antholim.co.Backend.dto.response.Response;

@Slf4j
@Controller
@RestController
public class PropertyController {
    public PropertyController() {

    }

    @PostMapping("/api/v1/property")
    public Response<?> createProperty(@RequestBody PropertyDto propertyDto) {

        return Response.ok();
    }
}
