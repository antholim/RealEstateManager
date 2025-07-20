package www.antholim.co.Backend.dto.summary;

import java.math.BigDecimal;
import java.time.LocalDate;

public class TenantSummaryDto {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private LocalDate leaseStart;
    private LocalDate leaseEnd;
    private BigDecimal rentAmount;
}
