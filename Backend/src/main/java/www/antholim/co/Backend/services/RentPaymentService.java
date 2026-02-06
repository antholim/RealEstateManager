package www.antholim.co.Backend.services;

import www.antholim.co.Backend.dto.model.RentPaymentDto;
import www.antholim.co.Backend.dto.request.RentPaymentRequestDto;
import www.antholim.co.Backend.dto.summary.MonthlyIncomeDto;
import www.antholim.co.Backend.enums.PaymentMethod;

import java.util.List;
import java.util.UUID;

public interface RentPaymentService {
    RentPaymentDto createPayment(RentPaymentRequestDto requestDto, UUID userId);
    RentPaymentDto markAsPaid(Long paymentId, PaymentMethod paymentMethod, UUID userId);
    List<RentPaymentDto> getPayments(UUID userId, Integer month, Integer year);
    List<RentPaymentDto> getOverduePayments(UUID userId);
    List<RentPaymentDto> getPaymentsByTenant(Long tenantId);
    List<RentPaymentDto> getPaymentsByProperty(Long propertyId);
    MonthlyIncomeDto calculateMonthlyIncome(UUID userId, Integer month, Integer year);
}
