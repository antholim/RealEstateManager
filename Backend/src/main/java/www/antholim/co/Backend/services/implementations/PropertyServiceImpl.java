package www.antholim.co.Backend.services.implementations;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import www.antholim.co.Backend.dto.model.LeaseDto;
import www.antholim.co.Backend.dto.model.PropertyDto;
import www.antholim.co.Backend.dto.summary.PropertySummaryDto;
import www.antholim.co.Backend.dto.summary.TenantSummaryDto;
import www.antholim.co.Backend.enums.LeaseStatus;
import www.antholim.co.Backend.models.Property;
import www.antholim.co.Backend.models.Unit;
import www.antholim.co.Backend.models.User;
import www.antholim.co.Backend.repository.LeaseRepository;
import www.antholim.co.Backend.repository.PropertyRepository;
import www.antholim.co.Backend.repository.UserRepository;
import www.antholim.co.Backend.services.LeaseService;
import www.antholim.co.Backend.services.PropertyService;

import java.util.*;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {
    private final LeaseService leaseService;
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final LeaseRepository leaseRepository;

    @Override
    public Property getProperty(Long id) {
        return null;
    }

    @Override
    public List<PropertyDto> getProperties(Long userId) {
        return PropertyDto.toDto(propertyRepository.findByUserId(userId));
    }
    @Override
    public List<PropertySummaryDto> getPropertiesSummary(Long userId) {
        List<Property> properties = propertyRepository.findByUserId(userId);
        int size = properties.size();

        List<PropertySummaryDto> propertySummaryDtoList = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TenantSummaryDto tenantSummaryDto = null;
            for (Unit unit : properties.get(i).getUnits()) {
                List<LeaseDto> leases = leaseService.getAllLeases(unit.getId());
                Optional<LeaseDto> activeLease = leases.stream()
                        .filter(lease -> lease.getStatus() == LeaseStatus.ACTIVE)
                        .findFirst();

                if (activeLease.isPresent()) {
                    LeaseDto lease = activeLease.get();
                    tenantSummaryDto = new TenantSummaryDto(
                            null, "", "", "",
                            lease.getStartDate(),
                            lease.getEndDate(),
                            lease.getMonthlyRent()
                    );
                    break;
                }
            }
        }


        return propertySummaryDtoList;
    }

    @Override
    public PropertyDto createProperty(PropertyDto propertyDto, Long userId) {
        User userReference = userRepository.getReferenceById(userId);
        Property newProperty = new Property();
        newProperty.setPropertyName(propertyDto.getPropertyName())
                .setPropertyType(propertyDto.getPropertyType())
                .setPurchasePrice(propertyDto.getPurchasePrice())
                .setAddress(propertyDto.getAddress())
                .setUser(userReference);

        Property savedProperty = propertyRepository.save(newProperty);  // Save the entity, not the DTO
        return PropertyDto.toDto(savedProperty);
    }
}
