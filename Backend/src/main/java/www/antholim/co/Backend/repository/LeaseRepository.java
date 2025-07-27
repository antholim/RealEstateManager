package www.antholim.co.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import www.antholim.co.Backend.models.Lease;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeaseRepository extends JpaRepository<Lease, Long> {
    List<Lease> findByUnitId(Long unitId);
    @Query(
            value = "SELECT * FROM leases WHERE unit_id = :unitId AND status = 'ACTIVE' LIMIT 1",
            nativeQuery = true
    )
    Optional<Lease> findOptionalActiveLeaseByUnitId(@Param("unitId") Long unitId);
}
