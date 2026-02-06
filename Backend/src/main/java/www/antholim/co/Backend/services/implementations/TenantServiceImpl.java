package www.antholim.co.Backend.services.implementations;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import www.antholim.co.Backend.dto.model.TenantDto;
import www.antholim.co.Backend.dto.request.TenantRequestDto;
import www.antholim.co.Backend.enums.TenantStatus;
import www.antholim.co.Backend.exceptions.custom.ResourceNotFoundException;
import www.antholim.co.Backend.mappers.TenantMapper;
import www.antholim.co.Backend.models.Property;
import www.antholim.co.Backend.models.Tenant;
import www.antholim.co.Backend.models.User;
import www.antholim.co.Backend.repository.PropertyRepository;
import www.antholim.co.Backend.repository.TenantRepository;
import www.antholim.co.Backend.repository.UserRepository;
import www.antholim.co.Backend.services.TenantService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TenantServiceImpl implements TenantService {
    private final TenantRepository tenantRepository;
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final TenantMapper tenantMapper;
    @Override
    public Optional<TenantDto> getTenant(Long id) {
        return tenantRepository.findById(id)
                .map(tenantMapper::tenantToTenantDto);
    }

    @Override
    public Optional<TenantDto> getTenantByLeaseId(Long unitId) {
        return tenantRepository.findTenantByLeaseId(unitId).map(tenantMapper::tenantToTenantDto);
    }


    @Override
    public Optional<List<TenantDto>> getTenants(UUID userId) {
        List<Tenant> tenants = tenantRepository.findTenantsByUserId(userId);
        if (tenants.isEmpty()) {
            return Optional.empty();
        }
        List<TenantDto> tenantDtos = tenants.stream()
                .map(tenantMapper::tenantToTenantDto)
                .toList();
        return Optional.of(tenantDtos);
    }

    @Override
    public Boolean createTenant(TenantRequestDto tenantRequestDto) {
        User userReference = userRepository.getReferenceById(tenantRequestDto.getUserId());
        Tenant newTenant = new Tenant();
        newTenant.setFirstName(tenantRequestDto.getFirstName())
        .setLastName(tenantRequestDto.getLastName())
        .setEmail(tenantRequestDto.getEmail())
        .setPhone(tenantRequestDto.getPhone())
        .setUser(userReference);

        if (tenantRequestDto.getPropertyId() != null) {
            Property propertyReference = propertyRepository.getReferenceById(tenantRequestDto.getPropertyId());
            newTenant.setProperty(propertyReference);
        }

        Tenant savedTenant = tenantRepository.save(newTenant);
        return true;
    }

    @Override
    public TenantDto updateTenant(Long tenantId, TenantRequestDto tenantRequestDto, UUID userId) {
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found"));

        if (tenantRequestDto.getFirstName() != null) tenant.setFirstName(tenantRequestDto.getFirstName());
        if (tenantRequestDto.getLastName() != null) tenant.setLastName(tenantRequestDto.getLastName());
        if (tenantRequestDto.getEmail() != null) tenant.setEmail(tenantRequestDto.getEmail());
        if (tenantRequestDto.getPhone() != null) tenant.setPhone(tenantRequestDto.getPhone());
        if (tenantRequestDto.getPropertyId() != null) {
            Property propertyReference = propertyRepository.getReferenceById(tenantRequestDto.getPropertyId());
            tenant.setProperty(propertyReference);
        }

        Tenant saved = tenantRepository.save(tenant);
        return tenantMapper.tenantToTenantDto(saved);
    }

    @Override
    public void deleteTenant(Long tenantId, UUID userId) {
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found"));
        tenant.setStatus(TenantStatus.FORMER);
        tenantRepository.save(tenant);
    }
}
