package www.antholim.co.Backend.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import lombok.experimental.Accessors;
import www.antholim.co.Backend.enums.ExpenseCategory;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Accessors
@NoArgsConstructor
@AllArgsConstructor
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class ExpenseRequestDto {
    private Long propertyId;
    private ExpenseCategory category;
    private BigDecimal amount;
    private LocalDate date;
    private String description;
}
