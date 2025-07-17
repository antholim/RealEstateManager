package www.antholim.co.Backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import www.antholim.co.Backend.dto.model.LeaseDto;
import www.antholim.co.Backend.dto.model.PropertyDto;
import www.antholim.co.Backend.dto.response.Response;
import www.antholim.co.Backend.services.LeaseService;

import java.util.List;

@Slf4j
@RestController
@AllArgsConstructor
public class LeaseController {
    private final LeaseService leaseService;
//    @GetMapping("/api/v1/lease")
//    public Response<?> getProperty(HttpServletRequest request) {
//        return Response.ok().setPayload(properties);
//    }
    @PostMapping("/api/v1/lease")
    public Response<?> createProperty(@RequestBody LeaseDto leaseDto, HttpServletRequest request) {
        leaseService.createLease(leaseDto);
        return Response.ok().setPayload(leaseDto);
    }
}
