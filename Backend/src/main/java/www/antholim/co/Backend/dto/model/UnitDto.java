package www.antholim.co.Backend.dto.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import lombok.experimental.Accessors;
import www.antholim.co.Backend.enums.UnitType;
import www.antholim.co.Backend.models.Unit;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class UnitDto {

    private Long id;

    private Long propertyId;

    private String unitNumber;

    private UnitType unitType;

    public static UnitDto toDto(Unit unit) {
        return new UnitDto()
                .setId(unit.getId())
                .setPropertyId(unit.getProperty().getId())
                .setUnitNumber(unit.getUnitNumber())
                .setUnitType(unit.getUnitType());
    }
    public static List<UnitDto> toDto(List<Unit> units) {
        List<UnitDto> dtos = new ArrayList<>();
        if (units != null) {
            for (Unit unit : units) {
                dtos.add(toDto(unit));
            }
        }
        return dtos;
    }
}
