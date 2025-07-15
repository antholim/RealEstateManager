package www.antholim.co.Backend.mappers;

import org.mapstruct.Mapper;
import www.antholim.co.Backend.dto.model.TenantDto;
import www.antholim.co.Backend.models.Tenant;

@Mapper(componentModel = "spring")
public interface TenantMapper {
    Tenant tenantDtoToTenant(TenantDto tenantDto);
    TenantDto tenantToTenantDto(Tenant tenant);
}
