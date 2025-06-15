package www.antholim.co.Backend.services;

import www.antholim.co.Backend.dto.model.PropertyDto;
import www.antholim.co.Backend.models.Property;

import java.util.List;

public interface PropertyService {
    Property getProperty(Long id);
    List<Property> getProperties(Long userId);
    PropertyDto createProperty(PropertyDto propertyDto, Long id);
}
