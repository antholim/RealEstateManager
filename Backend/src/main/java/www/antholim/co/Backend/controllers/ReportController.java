package www.antholim.co.Backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import www.antholim.co.Backend.dto.response.Response;
import www.antholim.co.Backend.dto.summary.ReportDto;
import www.antholim.co.Backend.services.CookieService;
import www.antholim.co.Backend.services.ReportService;
import www.antholim.co.Backend.services.TokenService;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/report")
public class ReportController {
    private final ReportService reportService;
    private final TokenService tokenService;
    private final CookieService cookieService;

    @GetMapping("/monthly")
    public Response<?> getMonthlyReport(
            HttpServletRequest request,
            @RequestParam Integer month,
            @RequestParam Integer year) {
        String jwt = cookieService.getTokenFromCookie(request, "authToken");
        if (jwt == null) {
            return Response.error(Response.Status.UNAUTHORIZED, "Authentication required");
        }
        UUID userId = tokenService.extractUserId(jwt);
        ReportDto report = reportService.generateMonthlyIncomeSummary(userId, month, year);
        return Response.ok().setPayload(report);
    }

    @GetMapping("/by-property")
    public Response<?> getByPropertyReport(
            HttpServletRequest request,
            @RequestParam Integer month,
            @RequestParam Integer year) {
        String jwt = cookieService.getTokenFromCookie(request, "authToken");
        if (jwt == null) {
            return Response.error(Response.Status.UNAUTHORIZED, "Authentication required");
        }
        UUID userId = tokenService.extractUserId(jwt);
        ReportDto report = reportService.generateIncomeByProperty(userId, month, year);
        return Response.ok().setPayload(report);
    }

    @GetMapping("/by-tenant")
    public Response<?> getByTenantReport(
            HttpServletRequest request,
            @RequestParam Integer month,
            @RequestParam Integer year) {
        String jwt = cookieService.getTokenFromCookie(request, "authToken");
        if (jwt == null) {
            return Response.error(Response.Status.UNAUTHORIZED, "Authentication required");
        }
        UUID userId = tokenService.extractUserId(jwt);
        ReportDto report = reportService.generateIncomeByTenant(userId, month, year);
        return Response.ok().setPayload(report);
    }

    @GetMapping("/yearly")
    public Response<?> getYearlyReport(
            HttpServletRequest request,
            @RequestParam Integer year) {
        String jwt = cookieService.getTokenFromCookie(request, "authToken");
        if (jwt == null) {
            return Response.error(Response.Status.UNAUTHORIZED, "Authentication required");
        }
        UUID userId = tokenService.extractUserId(jwt);
        ReportDto report = reportService.generateYearlyOverview(userId, year);
        return Response.ok().setPayload(report);
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportReport(
            HttpServletRequest request,
            @RequestParam String type,
            @RequestParam(required = false) Integer month,
            @RequestParam Integer year) {
        String jwt = cookieService.getTokenFromCookie(request, "authToken");
        if (jwt == null) {
            return ResponseEntity.status(401).build();
        }
        UUID userId = tokenService.extractUserId(jwt);

        ReportDto report;
        switch (type.toUpperCase()) {
            case "MONTHLY" -> report = reportService.generateMonthlyIncomeSummary(userId, month, year);
            case "BY_PROPERTY" -> report = reportService.generateIncomeByProperty(userId, month, year);
            case "BY_TENANT" -> report = reportService.generateIncomeByTenant(userId, month, year);
            case "YEARLY" -> report = reportService.generateYearlyOverview(userId, year);
            default -> {
                return ResponseEntity.badRequest().build();
            }
        }

        byte[] csv = reportService.exportReportToCsv(report);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=report_" + type + "_" + year + ".csv")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(csv);
    }
}
