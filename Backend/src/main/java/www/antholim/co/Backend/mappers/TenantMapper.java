package www.antholim.co.Backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import www.antholim.co.Backend.dto.model.TenantDto;
import www.antholim.co.Backend.models.Tenant;

@Mapper(componentModel = "spring")
public interface TenantMapper {
    Tenant tenantDtoToTenant(TenantDto tenantDto);

    @Mapping(source = "property.id", target = "propertyId")
    @Mapping(source = "property.propertyName", target = "propertyName")
    TenantDto tenantToTenantDto(Tenant tenant);
}
