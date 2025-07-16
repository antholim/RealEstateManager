package www.antholim.co.Backend.services;

import www.antholim.co.Backend.dto.model.PropertyDto;
import www.antholim.co.Backend.dto.summary.PropertySummaryDto;
import www.antholim.co.Backend.models.Property;

import java.util.List;

public interface PropertyService {
    Property getProperty(Long id);
    List<PropertyDto> getProperties(Long userId);
    PropertyDto createProperty(PropertyDto propertyDto, Long userId);
    List<PropertySummaryDto> getPropertiesSummary(Long userId);
}
