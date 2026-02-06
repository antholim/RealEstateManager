package www.antholim.co.Backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import www.antholim.co.Backend.dto.model.RentPaymentDto;
import www.antholim.co.Backend.models.RentPayment;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RentPaymentMapper {

    @Mapping(source = "tenant.id", target = "tenantId")
    @Mapping(expression = "java(rentPayment.getTenant().getFirstName() + \" \" + rentPayment.getTenant().getLastName())", target = "tenantName")
    @Mapping(source = "property.id", target = "propertyId")
    @Mapping(source = "property.propertyName", target = "propertyName")
    @Mapping(source = "lease.id", target = "leaseId")
    RentPaymentDto toDto(RentPayment rentPayment);

    List<RentPaymentDto> toDtoList(List<RentPayment> rentPayments);
}
