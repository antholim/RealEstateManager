package www.antholim.co.Backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import www.antholim.co.Backend.dto.model.ExpenseDto;
import www.antholim.co.Backend.dto.request.ExpenseRequestDto;
import www.antholim.co.Backend.dto.response.Response;
import www.antholim.co.Backend.services.CookieService;
import www.antholim.co.Backend.services.ExpenseService;
import www.antholim.co.Backend.services.TokenService;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/expense")
public class ExpenseController {
    private final ExpenseService expenseService;
    private final TokenService tokenService;
    private final CookieService cookieService;

    @GetMapping
    public Response<?> getExpenses(
            HttpServletRequest request,
            @RequestParam(required = false) Long propertyId,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate) {
        String jwt = cookieService.getTokenFromCookie(request, "authToken");
        if (jwt == null) {
            return Response.error(Response.Status.UNAUTHORIZED, "Authentication required");
        }
        UUID userId = tokenService.extractUserId(jwt);
        List<ExpenseDto> expenses = expenseService.getExpenses(userId, propertyId, startDate, endDate);
        return Response.ok().setPayload(expenses);
    }

    @PostMapping
    public Response<?> createExpense(@RequestBody ExpenseRequestDto requestDto, HttpServletRequest request) {
        String jwt = cookieService.getTokenFromCookie(request, "authToken");
        if (jwt == null) {
            return Response.error(Response.Status.UNAUTHORIZED, "Authentication required");
        }
        UUID userId = tokenService.extractUserId(jwt);
        ExpenseDto expense = expenseService.createExpense(requestDto, userId);
        return Response.created().setPayload(expense);
    }

    @PutMapping("/{id}")
    public Response<?> updateExpense(@PathVariable Long id, @RequestBody ExpenseRequestDto requestDto, HttpServletRequest request) {
        String jwt = cookieService.getTokenFromCookie(request, "authToken");
        if (jwt == null) {
            return Response.error(Response.Status.UNAUTHORIZED, "Authentication required");
        }
        UUID userId = tokenService.extractUserId(jwt);
        ExpenseDto expense = expenseService.updateExpense(id, requestDto, userId);
        return Response.ok().setPayload(expense);
    }

    @DeleteMapping("/{id}")
    public Response<?> deleteExpense(@PathVariable Long id, HttpServletRequest request) {
        String jwt = cookieService.getTokenFromCookie(request, "authToken");
        if (jwt == null) {
            return Response.error(Response.Status.UNAUTHORIZED, "Authentication required");
        }
        UUID userId = tokenService.extractUserId(jwt);
        expenseService.deleteExpense(id, userId);
        return Response.ok().setPayload("Expense deleted");
    }
}
