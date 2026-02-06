package www.antholim.co.Backend.services;

import www.antholim.co.Backend.dto.model.PropertyDto;
import www.antholim.co.Backend.dto.request.PropertyRequestDto;
import www.antholim.co.Backend.dto.summary.PropertySummaryDto;
import www.antholim.co.Backend.models.Property;

import java.util.List;
import java.util.UUID;

public interface PropertyService {
    Property getProperty(Long id);
    List<PropertyDto> getProperties(UUID userId);
    PropertyDto createProperty(PropertyRequestDto propertyRequestDto, UUID userId);
    PropertyDto updateProperty(Long propertyId, PropertyRequestDto propertyRequestDto, UUID userId);
    void deleteProperty(Long propertyId, UUID userId);
    List<PropertySummaryDto> getPropertiesSummary(UUID userId);
}
