package www.antholim.co.Backend.services;

import www.antholim.co.Backend.dto.model.LeaseDto;

import java.util.List;
import java.util.Optional;

public interface LeaseService {
    Optional<LeaseDto> getLease(Long id);
    List<LeaseDto> getAllLeases(Long id);
    LeaseDto createLease(LeaseDto leaseDto);
}