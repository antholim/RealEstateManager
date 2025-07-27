package www.antholim.co.Backend.dto.summary;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TenantSummaryDto {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private LocalDate leaseStart;
    private LocalDate leaseEnd;
    private BigDecimal monthlyRent;
}
