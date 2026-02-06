package www.antholim.co.Backend.dto.summary;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class DashboardSummaryDto {
    private BigDecimal totalRentThisMonth;
    private BigDecimal amountCollected;
    private BigDecimal amountOutstanding;
    private int propertyCount;
    private int tenantCount;
    private int overdueCount;
    private List<MonthlyIncomeDto> monthlyHistory;
    private double paidRatio;
    private double unpaidRatio;
}
