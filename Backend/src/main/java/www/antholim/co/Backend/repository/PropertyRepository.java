package www.antholim.co.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import www.antholim.co.Backend.models.Property;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    @Query("SELECT DISTINCT p FROM Property p LEFT JOIN FETCH p.units WHERE p.user.id = :userId")
    List<Property> findByUserId(@Param("userId") Long userId);
}
