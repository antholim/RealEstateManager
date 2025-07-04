package www.antholim.co.Backend.services.implementations;

import org.springframework.stereotype.Service;
import www.antholim.co.Backend.dto.model.UnitDto;
import www.antholim.co.Backend.models.Unit;
import www.antholim.co.Backend.services.UnitService;

import java.util.List;

@Service
public class UnitServiceImpl implements UnitService {
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
        return null;
    }
}
