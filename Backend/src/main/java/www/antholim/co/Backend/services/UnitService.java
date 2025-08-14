package www.antholim.co.Backend.services;

import www.antholim.co.Backend.dto.model.UnitDto;
import www.antholim.co.Backend.dto.request.UnitRequestDto;
import www.antholim.co.Backend.models.Unit;

import java.util.List;

public interface UnitService {
    Unit getUnit(Long id);
    List<UnitDto> getUnits(Long propertyId);
    UnitDto createUnit(UnitRequestDto unitRequestDto, Long propertyId);
}
