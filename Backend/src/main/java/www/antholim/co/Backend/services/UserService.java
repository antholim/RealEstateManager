package www.antholim.co.Backend.services;

import jakarta.servlet.http.HttpServletResponse;
import www.antholim.co.Backend.dto.model.UserDto;
import www.antholim.co.Backend.dto.model.UserResponseDto;
import www.antholim.co.Backend.dto.request.LoginRequest;
import www.antholim.co.Backend.dto.response.AuthenticationResponse;
import www.antholim.co.Backend.models.User;

import java.util.ArrayList;

public interface UserService {
    boolean verifyToken(String token);
    User getAuthenticatedUser();
    User createUser(UserDto userDto);
    AuthenticationResponse login(LoginRequest loginRequest, HttpServletResponse response);
    UserResponseDto register(UserDto userDto);
    ArrayList<User> getUsers();
}
