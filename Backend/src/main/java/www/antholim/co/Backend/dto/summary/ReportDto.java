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
public class ReportDto {
    private String reportType;
    private String period;
    private BigDecimal totalRentCollected;
    private BigDecimal totalExpenses;
    private BigDecimal netCashFlow;
    private List<ReportLineItemDto> lineItems;
}
