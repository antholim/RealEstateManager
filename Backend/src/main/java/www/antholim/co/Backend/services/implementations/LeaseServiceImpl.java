package www.antholim.co.Backend.services.implementations;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import www.antholim.co.Backend.dto.model.LeaseDto;
import www.antholim.co.Backend.mappers.LeaseMapper;
import www.antholim.co.Backend.models.Lease;
import www.antholim.co.Backend.models.Tenant;
import www.antholim.co.Backend.models.Unit;
import www.antholim.co.Backend.repository.LeaseRepository;
import www.antholim.co.Backend.services.LeaseService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LeaseServiceImpl implements LeaseService {
    private final LeaseRepository leaseRepository;
    private final LeaseMapper leaseMapper;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<LeaseDto> getLease(Long id) {
        leaseRepository.findById(id);
        return Optional.empty();
    }

    @Override
    public List<LeaseDto> getAllLeases(Long id) {
        return List.of();
    }

    @Override
    public LeaseDto createLease(LeaseDto leaseDto) {
        // Get references first
        Tenant tenantRef = entityManager.getReference(Tenant.class, leaseDto.getTenantId());
        Unit unitRef = entityManager.getReference(Unit.class, leaseDto.getUnitId());

        // Convert DTO to entity using mapper
        Lease lease = leaseMapper.leaseDtoToLease(leaseDto);

        // Override the relationships with references
        lease.setTenant(tenantRef);
        lease.setUnit(unitRef);

        // Save and return
        Lease savedLease = leaseRepository.save(lease);
        return leaseMapper.leaseToLeaseDto(savedLease);
    }
    // Basic method to get all leases for a unit
    public List<LeaseDto> getLeasesByUnitId(Long unitId) {
        List<Lease> leases = leaseRepository.findByUnitId(unitId);
        return leaseMapper.leaseListToLeaseDtoList(leases);
    }
    @Override
    public Optional<LeaseDto> getActiveLease(Long id) {
        return leaseRepository.findOptionalActiveLeaseByUnitId(id)
                .map(leaseMapper::leaseToLeaseDto);
    }

}
