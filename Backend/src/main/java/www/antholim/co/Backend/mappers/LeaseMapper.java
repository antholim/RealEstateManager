package www.antholim.co.Backend.mappers;

import org.mapstruct.Mapper;
import www.antholim.co.Backend.dto.model.LeaseDto;
import www.antholim.co.Backend.models.Lease;

@Mapper(componentModel = "spring")
public interface LeaseMapper {
    Lease leaseDtoToLease(LeaseDto leaseDto);
    LeaseDto leaseToLeaseDto(Lease lease);
}
