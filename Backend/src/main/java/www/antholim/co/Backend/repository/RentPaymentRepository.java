package www.antholim.co.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import www.antholim.co.Backend.models.RentPayment;

import java.util.List;
import java.util.UUID;

@Repository
public interface RentPaymentRepository extends JpaRepository<RentPayment, Long> {

    @Query("SELECT rp FROM RentPayment rp WHERE rp.user.id = :userId ORDER BY rp.dueDate DESC")
    List<RentPayment> findByUserId(@Param("userId") UUID userId);

    @Query("SELECT rp FROM RentPayment rp WHERE rp.user.id = :userId AND rp.month = :month AND rp.year = :year ORDER BY rp.dueDate DESC")
    List<RentPayment> findByUserIdAndMonthAndYear(@Param("userId") UUID userId, @Param("month") Integer month, @Param("year") Integer year);

    @Query("SELECT rp FROM RentPayment rp WHERE rp.user.id = :userId AND rp.paymentStatus = 'UNPAID' AND rp.dueDate < CURRENT_DATE ORDER BY rp.dueDate ASC")
    List<RentPayment> findOverdueByUserId(@Param("userId") UUID userId);

    @Query("SELECT rp FROM RentPayment rp WHERE rp.user.id = :userId AND rp.year = :year ORDER BY rp.month ASC")
    List<RentPayment> findByUserIdAndYear(@Param("userId") UUID userId, @Param("year") Integer year);

    @Query("SELECT rp FROM RentPayment rp WHERE rp.tenant.id = :tenantId ORDER BY rp.dueDate DESC")
    List<RentPayment> findByTenantId(@Param("tenantId") Long tenantId);

    @Query("SELECT rp FROM RentPayment rp WHERE rp.property.id = :propertyId ORDER BY rp.dueDate DESC")
    List<RentPayment> findByPropertyId(@Param("propertyId") Long propertyId);
}
