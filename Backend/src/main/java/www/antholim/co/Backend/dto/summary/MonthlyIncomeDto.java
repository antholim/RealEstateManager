package www.antholim.co.Backend.dto.summary;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class MonthlyIncomeDto {
    private Integer month;
    private Integer year;
    private BigDecimal expectedIncome;
    private BigDecimal actualIncome;
    private BigDecimal outstanding;
    private int paidCount;
    private int partialCount;
    private int unpaidCount;
}
