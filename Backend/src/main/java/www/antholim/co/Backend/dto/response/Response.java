package www.antholim.co.Backend.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Setter
@Getter
@Accessors(chain = true)
public class Response<T> {
    public enum Status {
        OK, BAD_REQUEST, UNAUTHORIZED, VALIDATION_EXCEPTION, EXCEPTION, WRONG_CREDENTIALS, ACCESS_DENIED, NOT_FOUND, DUPLICATE_ENTITY
    }
    private Status status;
    private T payload;
    private Object errors;
    private Object metadata;
    private String token;
    public static <T> Response<T> ok() {
        Response<T> response = new Response<>();
        response.setStatus(Status.OK);
        return response;
    }
    public static <T> Response<T> error(Status status) {
        Response<T> response = new Response<>();
        response.setStatus(status);
        return response;
    }

    // Error with message
    public static <T> Response<T> error(Status status, String message) {
        Response<T> response = new Response<>();
        response.setStatus(status);
        response.setErrors(message);
        return response;
    }

    // Error with errors object
    public static <T> Response<T> error(Status status, Object errors) {
        Response<T> response = new Response<>();
        response.setStatus(status);
        response.setErrors(errors);
        return response;
    }
}
