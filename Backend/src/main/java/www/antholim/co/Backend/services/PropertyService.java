package www.antholim.co.Backend.services;

import www.antholim.co.Backend.dto.model.PropertyDto;
import www.antholim.co.Backend.models.Property;

public interface PropertyService {
    Property getProperty(Long id);
    Property createProperty(PropertyDto propertyDto, Long id);
}
