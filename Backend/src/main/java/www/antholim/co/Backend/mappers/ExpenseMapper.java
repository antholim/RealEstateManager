package www.antholim.co.Backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import www.antholim.co.Backend.dto.model.ExpenseDto;
import www.antholim.co.Backend.models.Expense;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ExpenseMapper {

    @Mapping(source = "property.id", target = "propertyId")
    @Mapping(source = "property.propertyName", target = "propertyName")
    ExpenseDto toDto(Expense expense);

    List<ExpenseDto> toDtoList(List<Expense> expenses);
}
