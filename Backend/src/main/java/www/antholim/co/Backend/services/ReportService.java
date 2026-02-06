package www.antholim.co.Backend.services;

import www.antholim.co.Backend.dto.summary.ReportDto;

import java.util.UUID;

public interface ReportService {
    ReportDto generateMonthlyIncomeSummary(UUID userId, Integer month, Integer year);
    ReportDto generateIncomeByProperty(UUID userId, Integer month, Integer year);
    ReportDto generateIncomeByTenant(UUID userId, Integer month, Integer year);
    ReportDto generateYearlyOverview(UUID userId, Integer year);
    byte[] exportReportToCsv(ReportDto report);
}
