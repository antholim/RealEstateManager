package www.antholim.co.Backend.mappers;

import org.mapstruct.Mapper;
import www.antholim.co.Backend.dto.model.LeaseDto;
import www.antholim.co.Backend.models.Lease;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LeaseMapper {
    Lease leaseDtoToLease(LeaseDto leaseDto);
    LeaseDto leaseToLeaseDto(Lease lease);

    List<Lease> leaseDtoListToLeaseList(List<LeaseDto> leaseDtoList);
    List<LeaseDto> leaseListToLeaseDtoList(List<Lease> leaseList);
}
