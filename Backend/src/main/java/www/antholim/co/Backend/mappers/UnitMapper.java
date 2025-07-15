package www.antholim.co.Backend.mappers;

import org.mapstruct.Mapper;
import www.antholim.co.Backend.dto.model.UnitDto;
import www.antholim.co.Backend.models.Unit;

@Mapper(componentModel = "spring")
public interface UnitMapper {
    Unit unitDtoToUnit(UnitDto unitDto);
    UnitDto unitToUnitDto(Unit unit);
}
