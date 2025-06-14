package www.antholim.co.Backend.controllers;

import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import www.antholim.co.Backend.dto.model.UserDto;
import www.antholim.co.Backend.dto.model.UserResponseDto;
import www.antholim.co.Backend.dto.request.LoginRequest;
import www.antholim.co.Backend.dto.response.Response;
import www.antholim.co.Backend.services.UserService;

@Slf4j
@Controller
@RestController
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/api/v1/register")
    public Response<?> register(@RequestBody UserDto userDto) {
        UserResponseDto user = userService.register(userDto);
        return Response.ok().setPayload(user);
    }
    @PostMapping("/api/v1/login")
    public Response<?> login(@RequestBody UserDto userDto, HttpServletResponse response) {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername(userDto.getUsername()).setPassword(userDto.getPassword());
        userService.login(loginRequest, response);
        return Response.ok().setPayload("Logged in");
    }
    @GetMapping("/api/v1/hello-world")
    public String getHelloWorld() {
        return "Hello world!";
    }

    @GetMapping("/api/v1/users")
    public Response<?> getUsers() {
        log.error("Get Users");
        return Response.ok().setPayload(userService.getUsers());
    }
}
