package www.antholim.co.Backend.dto.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import lombok.experimental.Accessors;
import www.antholim.co.Backend.enums.PropertyType;
import www.antholim.co.Backend.models.Property;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Accessors
@NoArgsConstructor
@AllArgsConstructor
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class PropertyDto {
    private Long id;
    private double purchasePrice;
    private PropertyType propertyType;
    private String address;
    private String propertyName;
    private int totalUnits;
    private double monthlyRevenue;

    public static PropertyDto toDto(Property property) {
        PropertyDto dto = new PropertyDto();
        dto.setId(property.getId());
        dto.setAddress(property.getAddress());
        dto.setPropertyName(property.getPropertyName());
        dto.setPurchasePrice(property.getPurchasePrice());
        dto.setPropertyType(property.getPropertyType());
        dto.setTotalUnits(property.getUnits().size());
        return dto;
    }
    public static List<PropertyDto> toDto(List<Property> properties) {
        List<PropertyDto> dtos = new ArrayList<>();
        for (Property property : properties) {
            dtos.add(toDto(property));
        }
        return dtos;
    }
}
