package www.antholim.co.Backend.repository;

import org.springframework.stereotype.Repository;
import www.antholim.co.Backend.models.Unit;

import java.util.List;

@Repository
public interface UnitRepository {
    List<Unit> findByPropertyId(Long propertyId);
}
