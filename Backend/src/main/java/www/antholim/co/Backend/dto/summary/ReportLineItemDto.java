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
public class ReportLineItemDto {
    private String label;
    private BigDecimal rentCollected;
    private BigDecimal expenses;
    private BigDecimal netAmount;
}
