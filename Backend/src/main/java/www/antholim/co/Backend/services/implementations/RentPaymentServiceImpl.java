package www.antholim.co.Backend.services.implementations;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import www.antholim.co.Backend.dto.model.RentPaymentDto;
import www.antholim.co.Backend.dto.request.RentPaymentRequestDto;
import www.antholim.co.Backend.dto.summary.MonthlyIncomeDto;
import www.antholim.co.Backend.enums.PaymentMethod;
import www.antholim.co.Backend.enums.PaymentStatus;
import www.antholim.co.Backend.exceptions.custom.ResourceNotFoundException;
import www.antholim.co.Backend.mappers.RentPaymentMapper;
import www.antholim.co.Backend.models.*;
import www.antholim.co.Backend.repository.*;
import www.antholim.co.Backend.services.RentPaymentService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RentPaymentServiceImpl implements RentPaymentService {
    private final RentPaymentRepository rentPaymentRepository;
    private final TenantRepository tenantRepository;
    private final PropertyRepository propertyRepository;
    private final LeaseRepository leaseRepository;
    private final UserRepository userRepository;
    private final RentPaymentMapper rentPaymentMapper;

    @Override
    public RentPaymentDto createPayment(RentPaymentRequestDto requestDto, UUID userId) {
        User user = userRepository.getReferenceById(userId);
        Tenant tenant = tenantRepository.findById(requestDto.getTenantId())
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found"));
        Property property = propertyRepository.findById(requestDto.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        RentPayment payment = new RentPayment();
        payment.setTenant(tenant)
                .setProperty(property)
                .setUser(user)
                .setAmountDue(requestDto.getAmountDue())
                .setAmountPaid(requestDto.getAmountPaid() != null ? requestDto.getAmountPaid() : BigDecimal.ZERO)
                .setPaymentDate(requestDto.getPaymentDate())
                .setPaymentMethod(requestDto.getPaymentMethod())
                .setPaymentStatus(requestDto.getPaymentStatus() != null ? requestDto.getPaymentStatus() : PaymentStatus.UNPAID)
                .setDueDate(requestDto.getDueDate())
                .setMonth(requestDto.getMonth())
                .setYear(requestDto.getYear())
                .setNotes(requestDto.getNotes());

        if (requestDto.getLeaseId() != null) {
            Lease lease = leaseRepository.findById(requestDto.getLeaseId()).orElse(null);
            payment.setLease(lease);
        }

        RentPayment saved = rentPaymentRepository.save(payment);
        return rentPaymentMapper.toDto(saved);
    }

    @Override
    public RentPaymentDto markAsPaid(Long paymentId, PaymentMethod paymentMethod, UUID userId) {
        RentPayment payment = rentPaymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found"));

        payment.setPaymentStatus(PaymentStatus.PAID);
        payment.setAmountPaid(payment.getAmountDue());
        payment.setPaymentDate(LocalDate.now());
        payment.setPaymentMethod(paymentMethod);

        RentPayment saved = rentPaymentRepository.save(payment);
        return rentPaymentMapper.toDto(saved);
    }

    @Override
    public List<RentPaymentDto> getPayments(UUID userId, Integer month, Integer year) {
        List<RentPayment> payments;
        if (month != null && year != null) {
            payments = rentPaymentRepository.findByUserIdAndMonthAndYear(userId, month, year);
        } else {
            payments = rentPaymentRepository.findByUserId(userId);
        }
        return rentPaymentMapper.toDtoList(payments);
    }

    @Override
    public List<RentPaymentDto> getOverduePayments(UUID userId) {
        return rentPaymentMapper.toDtoList(rentPaymentRepository.findOverdueByUserId(userId));
    }

    @Override
    public List<RentPaymentDto> getPaymentsByTenant(Long tenantId) {
        return rentPaymentMapper.toDtoList(rentPaymentRepository.findByTenantId(tenantId));
    }

    @Override
    public List<RentPaymentDto> getPaymentsByProperty(Long propertyId) {
        return rentPaymentMapper.toDtoList(rentPaymentRepository.findByPropertyId(propertyId));
    }

    @Override
    public MonthlyIncomeDto calculateMonthlyIncome(UUID userId, Integer month, Integer year) {
        List<RentPayment> payments = rentPaymentRepository.findByUserIdAndMonthAndYear(userId, month, year);

        BigDecimal expectedIncome = BigDecimal.ZERO;
        BigDecimal actualIncome = BigDecimal.ZERO;
        int paidCount = 0;
        int partialCount = 0;
        int unpaidCount = 0;

        for (RentPayment p : payments) {
            expectedIncome = expectedIncome.add(p.getAmountDue());
            actualIncome = actualIncome.add(p.getAmountPaid());
            switch (p.getPaymentStatus()) {
                case PAID -> paidCount++;
                case PARTIAL -> partialCount++;
                case UNPAID -> unpaidCount++;
            }
        }

        return MonthlyIncomeDto.builder()
                .month(month)
                .year(year)
                .expectedIncome(expectedIncome)
                .actualIncome(actualIncome)
                .outstanding(expectedIncome.subtract(actualIncome))
                .paidCount(paidCount)
                .partialCount(partialCount)
                .unpaidCount(unpaidCount)
                .build();
    }
}
