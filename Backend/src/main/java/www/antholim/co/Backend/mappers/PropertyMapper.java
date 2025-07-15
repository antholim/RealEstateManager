package www.antholim.co.Backend.mappers;

import org.mapstruct.Mapper;
import www.antholim.co.Backend.dto.model.PropertyDto;
import www.antholim.co.Backend.models.Property;

@Mapper(componentModel = "spring")
public interface PropertyMapper {
    Property propertyDtoToProperty(PropertyDto propertyDto);
    PropertyDto propertyToPropertyDto(Property property);
}
