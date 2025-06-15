package www.antholim.co.Backend.exceptions;

/**
 * Custom exception factory for authentication-related exceptions
 */
public class AuthExceptionFactory {

    public static class InvalidCredentialsException extends RuntimeException {
        public InvalidCredentialsException() {
            super("Invalid username or password");
        }

        public InvalidCredentialsException(String message) {
            super(message);
        }
    }

    public static class AuthenticationException extends RuntimeException {
        public AuthenticationException(String message) {
            super(message);
        }
    }

    public static class UnauthorizedException extends RuntimeException {
        public UnauthorizedException() {
            super("Unauthorized access");
        }

        public UnauthorizedException(String message) {
            super(message);
        }
    }

    public static class TokenExpiredException extends RuntimeException {
        public TokenExpiredException() {
            super("Token has expired");
        }

        public TokenExpiredException(String message) {
            super(message);
        }
    }

    public static class InvalidTokenException extends RuntimeException {
        public InvalidTokenException() {
            super("Invalid token");
        }

        public InvalidTokenException(String message) {
            super(message);
        }
    }
}