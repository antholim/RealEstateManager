package www.antholim.co.Backend.services;

import www.antholim.co.Backend.dto.model.TenantDto;
import www.antholim.co.Backend.models.Tenant;

public interface TenantService {
    Tenant getTenant(Long id);
    Tenant createTenant(TenantDto tenantDto, Long id);
}
