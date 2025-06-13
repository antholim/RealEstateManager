package www.antholim.co.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import www.antholim.co.Backend.models.Property;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Integer> {

}
