package www.antholim.co.Backend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
public class UserController {
    private final String helloWorld = "Hello World !";
    public UserController() {

    }
    @GetMapping("/api/v1/hello-world")
    public String getHelloWorld() {
        return helloWorld;
    }
}
