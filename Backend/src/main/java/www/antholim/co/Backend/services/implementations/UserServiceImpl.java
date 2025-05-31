package www.antholim.co.Backend.services.implementations;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import www.antholim.co.Backend.dto.model.UserDto;
import www.antholim.co.Backend.dto.request.LoginRequest;
import www.antholim.co.Backend.dto.response.AuthenticationResponse;
import www.antholim.co.Backend.enums.TokenType;
import www.antholim.co.Backend.models.User;
import www.antholim.co.Backend.repository.UserRepository;
import www.antholim.co.Backend.services.CookieService;
import www.antholim.co.Backend.services.TokenService;
import www.antholim.co.Backend.services.UserService;

import java.util.ArrayList;

@Slf4j
//@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private AuthenticationManager authenticationManager;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;
    private final CookieService cookieService;
    private final TokenService tokenService;

    @Autowired
    public UserServiceImpl(
            AuthenticationManager authenticationManager,
            BCryptPasswordEncoder bCryptPasswordEncoder,
            UserRepository userRepository,
            CookieService cookieService,
            TokenService tokenService
    ) {
        this.authenticationManager = authenticationManager;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userRepository = userRepository;
        this.cookieService = cookieService;
        this.tokenService = tokenService;
    }
    @Override
    public boolean verifyToken(String token) {
        return false;
    }

    @Override
    public User createUser(UserDto userDto) {
        User newUser = new User();
        newUser.setUsername(userDto.getUsername()).setPassword(bCryptPasswordEncoder.encode(userDto.getPassword())).setEmail(userDto.getEmail());
        userRepository.save(newUser);
        return newUser;
    }
    @Override
    public void login(LoginRequest loginRequest, HttpServletResponse response) {
        authenticate(loginRequest.getUsername(), loginRequest.getPassword());
        User user = getAuthenticatedUser();
        AuthenticationResponse res = generateAuthenticationResponse(user);
        cookieService.addTokenCookies(response, res);
    }
    @Override
    public AuthenticationResponse register(UserDto userDto) {
        log.info("Sign up for {}", userDto.getUsername()); // Fixed log statement
        User userNew = createUser(userDto);

        // FIXED: Use the original plain text password for authentication
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDto.getUsername(), userDto.getPassword())
        );

        // Set the authentication context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return generateAuthenticationResponse(userNew);
    }
    private AuthenticationResponse generateAuthenticationResponse(User user) {
        String jwtToken = tokenService.generateToken(user, TokenType.ACCESS_TOKEN);
        String refreshToken = tokenService.generateToken(user, TokenType.REFRESH_TOKEN);
        return new AuthenticationResponse(jwtToken, refreshToken);
    }
    private void authenticate(String username, String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (BadCredentialsException e) {
            log.error("Invalid credentials for user: {}", username, e);
//            throw Exception(USER, CUSTOM_EXCEPTION, "Wrong credentials.");
        } catch (DisabledException e) {
            log.error("Authentication failed, account is disabled: {}", username, e);
//            throw new Exception("Account is disabled.");
        } catch (Exception e) {
            log.error("Authentication failed for user: {}", username, e);
//            throw new Exception("Authentication failed.");
        }
    }
    @Override
    public ArrayList<User> getUsers() {
        return (ArrayList<User>) userRepository.findAll();
    }
    @Override
    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        return authentication.getPrincipal() instanceof User ? (User) authentication.getPrincipal() : null;
    }
}
