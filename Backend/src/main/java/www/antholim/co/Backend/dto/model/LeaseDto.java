package www.antholim.co.Backend.dto.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import lombok.experimental.Accessors;
import www.antholim.co.Backend.enums.LeaseStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Accessors
@NoArgsConstructor
@AllArgsConstructor
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class LeaseDto {

    private Long id;
    private Long unitId;
    private Long tenantId;

    private LocalDate startDate;
    private LocalDate endDate;

    private BigDecimal monthlyRent;
    private BigDecimal depositPaid;

    private LeaseStatus status;
    private LocalDateTime createdAt;
}