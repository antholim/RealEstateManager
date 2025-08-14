package www.antholim.co.Backend.dto.request;

import lombok.*;
import www.antholim.co.Backend.enums.UnitType;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UnitRequestDto {
    private Long propertyId;
    private String unitNumber;
    private UnitType unitType;
}
