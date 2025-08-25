package www.antholim.co.Backend.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Setter
@Getter
@Accessors(chain = true)
public class Response<T> {
    public enum Status {
        OK, BAD_REQUEST, UNAUTHORIZED, VALIDATION_EXCEPTION, EXCEPTION, WRONG_CREDENTIALS, ACCESS_DENIED, NOT_FOUND, DUPLICATE_ENTITY, CREATED
    }
    private Status status;
    private T payload;
    public static <T> Response<T> ok() {
        Response<T> response = new Response<>();
        response.setStatus(Status.OK);
        return response;
    }
    public static <T> Response<T> created() {
        Response<T> response = new Response<>();
        response.setStatus(Status.CREATED);
        return response;
    }
    public static <T> Response<T> error(Status status) {
        Response<T> response = new Response<>();
        response.setStatus(status);
        return response;
    }
    public static <T> Response<T> error(String message) {
        Response<T> response = new Response<>();
        return response;
    }

    // Error with message
    public static <T> Response<T> error(Status status, String message) {
        Response<T> response = new Response<>();
        response.setStatus(status);
        return response;
    }

    // Error with errors object
    public static <T> Response<T> error(Status status, Object errors) {
        Response<T> response = new Response<>();
        response.setStatus(status);
        return response;
    }
    public static <T> Response<T> duplicateEntity() {
        Response<T> response = new Response<>();
        response.setStatus(Status.DUPLICATE_ENTITY);
        return response;
    }

    public static <T> Response<T> exception() {
        Response<T> response = new Response<>();
        response.setStatus(Status.EXCEPTION);
        return response;
    }
}
