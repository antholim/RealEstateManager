package www.antholim.co.Backend.dto.request;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import lombok.experimental.Accessors;
import www.antholim.co.Backend.enums.PropertyType;

import java.math.BigDecimal;

@Getter
@Setter
@Accessors
@NoArgsConstructor
@AllArgsConstructor
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class PropertyRequestDto {
    private String propertyName;
    private String address;
    private BigDecimal purchasePrice;
    private PropertyType propertyType;
    private String notes;
}