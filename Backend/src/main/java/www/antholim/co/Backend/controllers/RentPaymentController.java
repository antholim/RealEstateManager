package www.antholim.co.Backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import www.antholim.co.Backend.dto.model.RentPaymentDto;
import www.antholim.co.Backend.dto.request.RentPaymentRequestDto;
import www.antholim.co.Backend.dto.response.Response;
import www.antholim.co.Backend.dto.summary.MonthlyIncomeDto;
import www.antholim.co.Backend.enums.PaymentMethod;
import www.antholim.co.Backend.services.CookieService;
import www.antholim.co.Backend.services.RentPaymentService;
import www.antholim.co.Backend.services.TokenService;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/rent-payment")
public class RentPaymentController {
    private final RentPaymentService rentPaymentService;
    private final TokenService tokenService;
    private final CookieService cookieService;

    @GetMapping
    public Response<?> getPayments(
            HttpServletRequest request,
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer year) {
        String jwt = cookieService.getTokenFromCookie(request, "authToken");
        if (jwt == null) {
            return Response.error(Response.Status.UNAUTHORIZED, "Authentication required");
        }
        UUID userId = tokenService.extractUserId(jwt);
        List<RentPaymentDto> payments = rentPaymentService.getPayments(userId, month, year);
        return Response.ok().setPayload(payments);
    }

    @GetMapping("/overdue")
    public Response<?> getOverduePayments(HttpServletRequest request) {
        String jwt = cookieService.getTokenFromCookie(request, "authToken");
        if (jwt == null) {
            return Response.error(Response.Status.UNAUTHORIZED, "Authentication required");
        }
        UUID userId = tokenService.extractUserId(jwt);
        List<RentPaymentDto> payments = rentPaymentService.getOverduePayments(userId);
        return Response.ok().setPayload(payments);
    }

    @GetMapping("/monthly-summary")
    public Response<?> getMonthlySummary(
            HttpServletRequest request,
            @RequestParam Integer month,
            @RequestParam Integer year) {
        String jwt = cookieService.getTokenFromCookie(request, "authToken");
        if (jwt == null) {
            return Response.error(Response.Status.UNAUTHORIZED, "Authentication required");
        }
        UUID userId = tokenService.extractUserId(jwt);
        MonthlyIncomeDto summary = rentPaymentService.calculateMonthlyIncome(userId, month, year);
        return Response.ok().setPayload(summary);
    }

    @PostMapping
    public Response<?> createPayment(@RequestBody RentPaymentRequestDto requestDto, HttpServletRequest request) {
        String jwt = cookieService.getTokenFromCookie(request, "authToken");
        if (jwt == null) {
            return Response.error(Response.Status.UNAUTHORIZED, "Authentication required");
        }
        UUID userId = tokenService.extractUserId(jwt);
        RentPaymentDto payment = rentPaymentService.createPayment(requestDto, userId);
        return Response.created().setPayload(payment);
    }

    @PutMapping("/{id}/mark-paid")
    public Response<?> markAsPaid(
            @PathVariable Long id,
            @RequestParam PaymentMethod paymentMethod,
            HttpServletRequest request) {
        String jwt = cookieService.getTokenFromCookie(request, "authToken");
        if (jwt == null) {
            return Response.error(Response.Status.UNAUTHORIZED, "Authentication required");
        }
        UUID userId = tokenService.extractUserId(jwt);
        RentPaymentDto payment = rentPaymentService.markAsPaid(id, paymentMethod, userId);
        return Response.ok().setPayload(payment);
    }
}
