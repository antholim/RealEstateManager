package www.antholim.co.Backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import www.antholim.co.Backend.dto.model.UserDto;
import www.antholim.co.Backend.dto.response.AuthenticationResponse;
import www.antholim.co.Backend.dto.response.Response;
import www.antholim.co.Backend.models.User;
import www.antholim.co.Backend.services.UserService;

@Slf4j
@Controller
@RestController
public class UserController {
    @Autowired
    private UserService userService;
    private final String helloWorld = "Hello World !";
    public UserController() {

    }
    @PostMapping("/api/v1/register")
    public Response<?> register(@RequestBody UserDto userDto) {
        log.error(userDto.toString(), "ICI");
        AuthenticationResponse authenticationResponse = userService.register(userDto);
        return Response.ok().setPayload("Register...").setToken(authenticationResponse.getToken());
    }
    @PostMapping("/api/v1/login")
    public Response<?> login(@RequestBody User user) {
        log.error(user.toString(), "ICI");
        return Response.ok().setPayload("Logged in");
    }
    @GetMapping("/api/v1/hello-world")
    public String getHelloWorld() {
        return helloWorld;
    }
}
