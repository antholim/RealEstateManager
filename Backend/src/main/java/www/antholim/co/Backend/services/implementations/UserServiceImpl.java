package www.antholim.co.Backend.services.implementations;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
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
import www.antholim.co.Backend.dto.model.UserResponseDto;
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
    private final AuthenticationManager authenticationManager;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
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

    @Transactional
    @Override
    public User createUser(UserDto userDto) {
        log.info("=== Starting createUser transaction ===");
        try {
            // Check if user already exists
            if (userRepository.findByUsername(userDto.getUsername()).isPresent()) {
                log.error("Username already exists: {}", userDto.getUsername());
                throw new RuntimeException("Username already exists");
            }

            if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
                log.error("Email already exists: {}", userDto.getEmail());
                throw new RuntimeException("Email already exists");
            }

            User newUser = new User();
            newUser.setUsername(userDto.getUsername())
                    .setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()))
                    .setEmail(userDto.getEmail());

            log.info("About to save user: {} with email: {}", userDto.getUsername(), userDto.getEmail());
            User savedUser = userRepository.save(newUser);
            log.info("User saved with ID: {}", savedUser.getId());

            return savedUser;
        } catch (Exception e) {
            log.error("=== Exception in createUser ===", e);
            throw e;
        }
    }
    @Override
    public AuthenticationResponse login(LoginRequest loginRequest, HttpServletResponse response) {
        log.info("=== Starting login transaction ===");

        authenticate(loginRequest.getUsername(), loginRequest.getPassword());
        User user = getAuthenticatedUser();
        AuthenticationResponse res = generateAuthenticationResponse(user);
        cookieService.addTokenCookies(response, res);

        return generateAuthenticationResponse(user);
    }
    @Override
    public UserResponseDto register(UserDto userDto) {
        log.info("Sign up for {}", userDto.getUsername()); // Fixed log statement
        User userNew = createUser(userDto);
        log.info("STEP 1");
        // FIXED: Use the original plain text password for authentication
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(userDto.getUsername(), userDto.getPassword())
//        );
        log.info("STEP 2");
        // Set the authentication context
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        authenticate(userNew.getUsername(), userNew.getPassword());
        log.info("DONE");
        UserResponseDto userResponseDto = new UserResponseDto();
        userResponseDto.setUsername(userDto.getUsername());
        userResponseDto.setEmail(userDto.getEmail());

        return userResponseDto;
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
