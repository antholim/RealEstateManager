package www.antholim.co.Backend.services;

import jakarta.servlet.http.HttpServletResponse;
import www.antholim.co.Backend.dto.request.LoginRequest;
import www.antholim.co.Backend.models.User;

public interface UserService {
    boolean verifyToken(String token);
    User getAuthenticatedUser();
    User createUser(String username, String email, String password);
    void login(LoginRequest loginRequest, HttpServletResponse response);
}
