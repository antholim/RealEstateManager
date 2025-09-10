package www.antholim.co.Backend.services.implementations;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import www.antholim.co.Backend.dto.model.TenantDto;
import www.antholim.co.Backend.dto.request.TenantRequestDto;
import www.antholim.co.Backend.mappers.TenantMapper;
import www.antholim.co.Backend.models.Tenant;
import www.antholim.co.Backend.models.User;
import www.antholim.co.Backend.repository.TenantRepository;
import www.antholim.co.Backend.repository.UserRepository;
import www.antholim.co.Backend.services.TenantService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TenantServiceImpl implements TenantService {
    private final TenantRepository tenantRepository;
    private final UserRepository userRepository;
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
    public Optional<List<TenantDto>> getTenants(Long userId) {
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
        Tenant savedTenant = tenantRepository.save(newTenant);
        return true;
    }
}
