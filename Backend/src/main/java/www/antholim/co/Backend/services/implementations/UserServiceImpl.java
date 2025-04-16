package www.antholim.co.Backend.services.implementations;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import www.antholim.co.Backend.models.User;
import www.antholim.co.Backend.services.UserService;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private AuthenticationManager authenticationManager;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Override
    public boolean verifyToken(String token) {
        return false;
    }
    private User createUser(String username, String email, String password) {
        User user = new User();
        user.setUsername(username).setPassword(bCryptPasswordEncoder.encode(password)).setEmail(email);
        return user;
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
}
