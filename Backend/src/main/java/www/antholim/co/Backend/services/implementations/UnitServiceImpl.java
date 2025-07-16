package www.antholim.co.Backend.services.implementations;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import www.antholim.co.Backend.dto.model.UnitDto;
import www.antholim.co.Backend.models.Property;
import www.antholim.co.Backend.models.Unit;
import www.antholim.co.Backend.repository.PropertyRepository;
import www.antholim.co.Backend.repository.UnitRepository;
import www.antholim.co.Backend.services.UnitService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UnitServiceImpl implements UnitService {
    private final PropertyRepository propertyRepository;
    private final UnitRepository unitRepository;

    @Override
    public Unit getUnit(Long id) {
        return null;
    }

    @Override
    public List<UnitDto> getUnits(Long propertyId) {
        return List.of();
    }

    @Override
    public UnitDto createUnit(UnitDto unitDto, Long propertyId) {
        Property propertyReference = propertyRepository.getReferenceById(propertyId);
        Unit unit = new Unit();
        unit.setUnitNumber(unitDto.getUnitNumber())
                .setUnitType(unitDto.getUnitType())
                .setProperty(propertyReference);
        Unit savedUnit = unitRepository.save(unit);
        return UnitDto.toDto(savedUnit);
    }
}
