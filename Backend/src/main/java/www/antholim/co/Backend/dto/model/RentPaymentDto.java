package www.antholim.co.Backend.dto.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import lombok.experimental.Accessors;
import www.antholim.co.Backend.enums.PaymentMethod;
import www.antholim.co.Backend.enums.PaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Accessors
@NoArgsConstructor
@AllArgsConstructor
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class RentPaymentDto {
    private Long id;
    private Long tenantId;
    private String tenantName;
    private Long propertyId;
    private String propertyName;
    private Long leaseId;
    private BigDecimal amountDue;
    private BigDecimal amountPaid;
    private LocalDate paymentDate;
    private PaymentMethod paymentMethod;
    private PaymentStatus paymentStatus;
    private LocalDate dueDate;
    private Integer month;
    private Integer year;
    private String notes;
}
