package www.antholim.co.Backend.services.implementations;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import www.antholim.co.Backend.dto.model.TenantDto;
import www.antholim.co.Backend.mappers.TenantMapper;
import www.antholim.co.Backend.models.Tenant;
import www.antholim.co.Backend.repository.TenantRepository;
import www.antholim.co.Backend.services.TenantService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TenantServiceImpl implements TenantService {
    private final TenantRepository tenantRepository;
    private final TenantMapper tenantMapper;
    @Override
    public Optional<TenantDto> getTenant(Long id) {
        return tenantRepository.findById(id)
                .map(tenantMapper::tenantToTenantDto);
    }


    @Override
    public Optional<List<TenantDto>> getTenants() {
        return Optional.empty();
    }

    @Override
    public Boolean createTenant(TenantDto tenantDto) {
        System.out.println(tenantDto.toString() + "DTO ABDEL");
        Tenant tenant = tenantMapper.tenantDtoToTenant(tenantDto);
        System.out.println(tenant.toString() + "ABDEL");
        tenant.setId(null);         // ensure it's treated as a new entity
        tenant.setVersion(1);    // let Hibernate handle versioning
        tenantRepository.save(tenant);
        return true;
    }
}
