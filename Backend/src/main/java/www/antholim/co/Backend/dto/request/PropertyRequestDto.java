package www.antholim.co.Backend.dto.request;
import lombok.*;
import www.antholim.co.Backend.enums.PropertyType;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PropertyRequestDto {
    private String propertyName;
    private String address;
    private BigDecimal purchasePrice;
    private PropertyType propertyType;
}