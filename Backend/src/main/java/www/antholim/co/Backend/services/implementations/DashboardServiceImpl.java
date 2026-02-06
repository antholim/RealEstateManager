package www.antholim.co.Backend.services.implementations;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import www.antholim.co.Backend.dto.summary.DashboardSummaryDto;
import www.antholim.co.Backend.dto.summary.MonthlyIncomeDto;
import www.antholim.co.Backend.enums.PaymentStatus;
import www.antholim.co.Backend.models.RentPayment;
import www.antholim.co.Backend.repository.*;
import www.antholim.co.Backend.services.DashboardService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {
    private final RentPaymentRepository rentPaymentRepository;
    private final ExpenseRepository expenseRepository;
    private final PropertyRepository propertyRepository;
    private final TenantRepository tenantRepository;

    @Override
    public DashboardSummaryDto getDashboardSummary(UUID userId) {
        LocalDate now = LocalDate.now();
        int currentMonth = now.getMonthValue();
        int currentYear = now.getYear();

        // Current month payments
        List<RentPayment> currentPayments = rentPaymentRepository.findByUserIdAndMonthAndYear(userId, currentMonth, currentYear);

        BigDecimal totalRent = BigDecimal.ZERO;
        BigDecimal collected = BigDecimal.ZERO;
        int paidCount = 0;
        int totalCount = currentPayments.size();

        for (RentPayment p : currentPayments) {
            totalRent = totalRent.add(p.getAmountDue());
            collected = collected.add(p.getAmountPaid());
            if (p.getPaymentStatus() == PaymentStatus.PAID) paidCount++;
        }

        BigDecimal outstanding = totalRent.subtract(collected);
        int overdueCount = rentPaymentRepository.findOverdueByUserId(userId).size();
        int propertyCount = propertyRepository.findByUserId(userId).size();
        int tenantCount = tenantRepository.findTenantsByUserId(userId).size();

        double paidRatio = totalCount > 0 ? (double) paidCount / totalCount : 0;
        double unpaidRatio = totalCount > 0 ? 1.0 - paidRatio : 0;

        // Monthly history for last 12 months
        List<MonthlyIncomeDto> monthlyHistory = new ArrayList<>();
        for (int i = 11; i >= 0; i--) {
            LocalDate historyDate = now.minusMonths(i);
            int m = historyDate.getMonthValue();
            int y = historyDate.getYear();

            List<RentPayment> monthPayments = rentPaymentRepository.findByUserIdAndMonthAndYear(userId, m, y);

            BigDecimal expected = BigDecimal.ZERO;
            BigDecimal actual = BigDecimal.ZERO;
            int paid = 0, partial = 0, unpaid = 0;

            for (RentPayment p : monthPayments) {
                expected = expected.add(p.getAmountDue());
                actual = actual.add(p.getAmountPaid());
                switch (p.getPaymentStatus()) {
                    case PAID -> paid++;
                    case PARTIAL -> partial++;
                    case UNPAID -> unpaid++;
                }
            }

            monthlyHistory.add(MonthlyIncomeDto.builder()
                    .month(m)
                    .year(y)
                    .expectedIncome(expected)
                    .actualIncome(actual)
                    .outstanding(expected.subtract(actual))
                    .paidCount(paid)
                    .partialCount(partial)
                    .unpaidCount(unpaid)
                    .build());
        }

        return DashboardSummaryDto.builder()
                .totalRentThisMonth(totalRent)
                .amountCollected(collected)
                .amountOutstanding(outstanding)
                .propertyCount(propertyCount)
                .tenantCount(tenantCount)
                .overdueCount(overdueCount)
                .monthlyHistory(monthlyHistory)
                .paidRatio(paidRatio)
                .unpaidRatio(unpaidRatio)
                .build();
    }
}
