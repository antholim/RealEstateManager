package www.antholim.co.Backend.services.implementations;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import www.antholim.co.Backend.dto.model.LeaseDto;
import www.antholim.co.Backend.dto.model.PropertyDto;
import www.antholim.co.Backend.dto.model.TenantDto;
import www.antholim.co.Backend.dto.request.PropertyRequestDto;
import www.antholim.co.Backend.dto.summary.PropertySummaryDto;
import www.antholim.co.Backend.dto.summary.TenantSummaryDto;
import www.antholim.co.Backend.enums.LeaseStatus;
import www.antholim.co.Backend.mappers.UnitMapper;
import www.antholim.co.Backend.models.Property;
import www.antholim.co.Backend.models.Tenant;
import www.antholim.co.Backend.models.Unit;
import www.antholim.co.Backend.models.User;
import www.antholim.co.Backend.repository.LeaseRepository;
import www.antholim.co.Backend.repository.PropertyRepository;
import www.antholim.co.Backend.repository.UserRepository;
import www.antholim.co.Backend.services.LeaseService;
import www.antholim.co.Backend.services.PropertyService;
import www.antholim.co.Backend.services.TenantService;

import java.util.*;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {
    private final LeaseService leaseService;
    private final TenantService tenantService;
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final LeaseRepository leaseRepository;
    private final UnitMapper unitMapper;

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

        List<PropertySummaryDto> propertySummaryDtoList = new ArrayList<>();
        for (int i = 0; i < properties.size(); i++) {
            List<TenantSummaryDto> tenantsSummaryDtoList = new ArrayList<>();
            LeaseDto leaseDto = null;
            for (Unit unit : properties.get(i).getUnits()) {
                TenantSummaryDto tenantSummaryDto = null;
                //false
                List<LeaseDto> leases = leaseService.getLeasesByUnitId(unit.getId());
                Optional<LeaseDto> activeLease = leases.stream()
                        .filter(lease -> lease.getStatus() == LeaseStatus.ACTIVE)
                        .findFirst();
                if (activeLease.isPresent()) {
                    leaseDto = activeLease.get();
                    Optional<TenantDto> optionalTenantDto = tenantService.getTenant(leaseDto.getTenantId());
                    TenantDto tenantDto;
                    if (optionalTenantDto.isPresent()) {
                        tenantDto = optionalTenantDto.get();
                        tenantsSummaryDtoList.add(new TenantSummaryDto(
                                unit.getId(),
                                unit.getUnitNumber(),
                                tenantDto.getFirstName() + " " + tenantDto.getLastName(),
                                tenantDto.getEmail(),
                                tenantDto.getPhone(),
                                leaseDto.getStartDate(),
                                leaseDto.getEndDate(),
                                leaseDto.getMonthlyRent()
                        ));
                        break;
                    }
                }
            }
            propertySummaryDtoList.add(new PropertySummaryDto(
                    properties.get(i).getId(),
                    properties.get(i).getPropertyName(),
                    properties.get(i).getAddress(),
                    properties.get(i).getPropertyType(),
                    properties.get(i).getUnits().size(),
                    0,
                    leaseDto != null ? leaseDto.getMonthlyRent() : null,
                    properties.get(i).getPurchasePrice(),
                    tenantsSummaryDtoList,
                    unitMapper.unitsToUnitDtos(properties.get(i).getUnits())
            ));
        }


        return propertySummaryDtoList;
    }

    @Override
    public PropertyDto createProperty(PropertyRequestDto propertyRequestDto, Long userId) {
        User userReference = userRepository.getReferenceById(userId);
        Property newProperty = new Property();
        newProperty.setPropertyName(propertyRequestDto.getPropertyName())
                .setPropertyType(propertyRequestDto.getPropertyType())
                .setPurchasePrice(propertyRequestDto.getPurchasePrice())
                .setAddress(propertyRequestDto.getAddress())
                .setUser(userReference);

        Property savedProperty = propertyRepository.save(newProperty);  // Save the entity, not the DTO
        return PropertyDto.toDto(savedProperty);
    }
}
