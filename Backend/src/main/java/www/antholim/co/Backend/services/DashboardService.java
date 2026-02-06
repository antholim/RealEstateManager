package www.antholim.co.Backend.services;

import www.antholim.co.Backend.dto.summary.DashboardSummaryDto;

import java.util.UUID;

public interface DashboardService {
    DashboardSummaryDto getDashboardSummary(UUID userId);
}
