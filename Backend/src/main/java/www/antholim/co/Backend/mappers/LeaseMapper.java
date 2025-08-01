package www.antholim.co.Backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import www.antholim.co.Backend.dto.model.LeaseDto;
import www.antholim.co.Backend.models.Lease;
import www.antholim.co.Backend.models.Tenant;
import www.antholim.co.Backend.models.Unit;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LeaseMapper {

    @Mappings({
            @Mapping(source = "unit.id", target = "unitId"),
            @Mapping(source = "tenant.id", target = "tenantId")
    })
    LeaseDto leaseToLeaseDto(Lease lease);

    @Mappings({
            @Mapping(source = "unitId", target = "unit"),
            @Mapping(source = "tenantId", target = "tenant")
    })
    Lease leaseDtoToLease(LeaseDto leaseDto);

    List<Lease> leaseDtoListToLeaseList(List<LeaseDto> leaseDtoList);
    List<LeaseDto> leaseListToLeaseDtoList(List<Lease> leaseList);

    // Custom ID-to-entity mappers (used by MapStruct)
    default Unit mapUnit(Long id) {
        if (id == null) return null;
        Unit unit = new Unit();
        unit.setId(id);
        return unit;
    }

    default Tenant mapTenant(Long id) {
        if (id == null) return null;
        Tenant tenant = new Tenant();
        tenant.setId(id);
        return tenant;
    }
}
