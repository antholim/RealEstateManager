package www.antholim.co.Backend.services;

import www.antholim.co.Backend.dto.model.TenantDto;
import www.antholim.co.Backend.dto.request.TenantRequestDto;
import www.antholim.co.Backend.models.Tenant;

import java.util.List;
import java.util.Optional;

public interface TenantService {
    Optional<TenantDto> getTenant(Long id);
    Optional<TenantDto> getTenantByLeaseId(Long id);
    Optional<List<TenantDto>> getTenants();
    Boolean createTenant(TenantRequestDto tenantRequestDto);
}
