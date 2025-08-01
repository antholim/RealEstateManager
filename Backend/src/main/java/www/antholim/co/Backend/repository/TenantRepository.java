package www.antholim.co.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import www.antholim.co.Backend.models.Lease;
import www.antholim.co.Backend.models.Tenant;

import java.util.List;
import java.util.Optional;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, Long> {
    @Query("SELECT l.tenant FROM Lease l WHERE l.id = :leaseId")
    Optional<Tenant> findTenantByLeaseId(@Param("leaseId") Long leaseId);

}
