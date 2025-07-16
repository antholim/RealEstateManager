package www.antholim.co.Backend.services.implementations;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import www.antholim.co.Backend.dto.model.LeaseDto;
import www.antholim.co.Backend.repository.LeaseRepository;
import www.antholim.co.Backend.services.LeaseService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LeaseServiceImpl implements LeaseService {
    private final LeaseRepository leaseRepository;
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
        return null;
    }
}
