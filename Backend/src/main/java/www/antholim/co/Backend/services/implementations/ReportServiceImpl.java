package www.antholim.co.Backend.services.implementations;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import www.antholim.co.Backend.dto.summary.ReportDto;
import www.antholim.co.Backend.dto.summary.ReportLineItemDto;
import www.antholim.co.Backend.models.Expense;
import www.antholim.co.Backend.models.Property;
import www.antholim.co.Backend.models.RentPayment;
import www.antholim.co.Backend.models.Tenant;
import www.antholim.co.Backend.repository.ExpenseRepository;
import www.antholim.co.Backend.repository.PropertyRepository;
import www.antholim.co.Backend.repository.RentPaymentRepository;
import www.antholim.co.Backend.repository.TenantRepository;
import www.antholim.co.Backend.services.ReportService;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.Month;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
    private final RentPaymentRepository rentPaymentRepository;
    private final ExpenseRepository expenseRepository;
    private final PropertyRepository propertyRepository;
    private final TenantRepository tenantRepository;

    @Override
    public ReportDto generateMonthlyIncomeSummary(UUID userId, Integer month, Integer year) {
        List<RentPayment> payments = rentPaymentRepository.findByUserIdAndMonthAndYear(userId, month, year);
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());
        List<Expense> expenses = expenseRepository.findByUserIdAndDateRange(userId, startDate, endDate);

        BigDecimal totalRent = payments.stream().map(RentPayment::getAmountPaid).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalExpenses = expenses.stream().map(Expense::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);

        List<ReportLineItemDto> lineItems = new ArrayList<>();
        lineItems.add(ReportLineItemDto.builder()
                .label("Rent Income")
                .rentCollected(totalRent)
                .expenses(BigDecimal.ZERO)
                .netAmount(totalRent)
                .build());
        lineItems.add(ReportLineItemDto.builder()
                .label("Expenses")
                .rentCollected(BigDecimal.ZERO)
                .expenses(totalExpenses)
                .netAmount(totalExpenses.negate())
                .build());

        return ReportDto.builder()
                .reportType("MONTHLY_SUMMARY")
                .period(Month.of(month).name() + " " + year)
                .totalRentCollected(totalRent)
                .totalExpenses(totalExpenses)
                .netCashFlow(totalRent.subtract(totalExpenses))
                .lineItems(lineItems)
                .build();
    }

    @Override
    public ReportDto generateIncomeByProperty(UUID userId, Integer month, Integer year) {
        List<RentPayment> payments = rentPaymentRepository.findByUserIdAndMonthAndYear(userId, month, year);
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());
        List<Expense> expenses = expenseRepository.findByUserIdAndDateRange(userId, startDate, endDate);

        Map<Long, List<RentPayment>> paymentsByProperty = payments.stream()
                .collect(Collectors.groupingBy(p -> p.getProperty().getId()));
        Map<Long, List<Expense>> expensesByProperty = expenses.stream()
                .collect(Collectors.groupingBy(e -> e.getProperty().getId()));

        Set<Long> allPropertyIds = new HashSet<>(paymentsByProperty.keySet());
        allPropertyIds.addAll(expensesByProperty.keySet());

        BigDecimal totalRent = BigDecimal.ZERO;
        BigDecimal totalExp = BigDecimal.ZERO;
        List<ReportLineItemDto> lineItems = new ArrayList<>();

        for (Long propertyId : allPropertyIds) {
            List<RentPayment> propPayments = paymentsByProperty.getOrDefault(propertyId, List.of());
            List<Expense> propExpenses = expensesByProperty.getOrDefault(propertyId, List.of());

            BigDecimal rent = propPayments.stream().map(RentPayment::getAmountPaid).reduce(BigDecimal.ZERO, BigDecimal::add);
            BigDecimal exp = propExpenses.stream().map(Expense::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);

            String propertyName = propPayments.isEmpty()
                    ? propExpenses.get(0).getProperty().getPropertyName()
                    : propPayments.get(0).getProperty().getPropertyName();

            lineItems.add(ReportLineItemDto.builder()
                    .label(propertyName)
                    .rentCollected(rent)
                    .expenses(exp)
                    .netAmount(rent.subtract(exp))
                    .build());

            totalRent = totalRent.add(rent);
            totalExp = totalExp.add(exp);
        }

        return ReportDto.builder()
                .reportType("BY_PROPERTY")
                .period(Month.of(month).name() + " " + year)
                .totalRentCollected(totalRent)
                .totalExpenses(totalExp)
                .netCashFlow(totalRent.subtract(totalExp))
                .lineItems(lineItems)
                .build();
    }

    @Override
    public ReportDto generateIncomeByTenant(UUID userId, Integer month, Integer year) {
        List<RentPayment> payments = rentPaymentRepository.findByUserIdAndMonthAndYear(userId, month, year);

        Map<Long, List<RentPayment>> paymentsByTenant = payments.stream()
                .collect(Collectors.groupingBy(p -> p.getTenant().getId()));

        BigDecimal totalRent = BigDecimal.ZERO;
        List<ReportLineItemDto> lineItems = new ArrayList<>();

        for (Map.Entry<Long, List<RentPayment>> entry : paymentsByTenant.entrySet()) {
            List<RentPayment> tenantPayments = entry.getValue();
            BigDecimal rent = tenantPayments.stream().map(RentPayment::getAmountPaid).reduce(BigDecimal.ZERO, BigDecimal::add);

            String tenantName = tenantPayments.get(0).getTenant().getFirstName() + " " + tenantPayments.get(0).getTenant().getLastName();

            lineItems.add(ReportLineItemDto.builder()
                    .label(tenantName)
                    .rentCollected(rent)
                    .expenses(BigDecimal.ZERO)
                    .netAmount(rent)
                    .build());

            totalRent = totalRent.add(rent);
        }

        return ReportDto.builder()
                .reportType("BY_TENANT")
                .period(Month.of(month).name() + " " + year)
                .totalRentCollected(totalRent)
                .totalExpenses(BigDecimal.ZERO)
                .netCashFlow(totalRent)
                .lineItems(lineItems)
                .build();
    }

    @Override
    public ReportDto generateYearlyOverview(UUID userId, Integer year) {
        List<RentPayment> payments = rentPaymentRepository.findByUserIdAndYear(userId, year);
        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year, 12, 31);
        List<Expense> expenses = expenseRepository.findByUserIdAndDateRange(userId, startDate, endDate);

        Map<Integer, List<RentPayment>> paymentsByMonth = payments.stream()
                .collect(Collectors.groupingBy(RentPayment::getMonth));
        Map<Integer, List<Expense>> expensesByMonth = expenses.stream()
                .collect(Collectors.groupingBy(e -> e.getDate().getMonthValue()));

        BigDecimal totalRent = BigDecimal.ZERO;
        BigDecimal totalExp = BigDecimal.ZERO;
        List<ReportLineItemDto> lineItems = new ArrayList<>();

        for (int m = 1; m <= 12; m++) {
            List<RentPayment> monthPayments = paymentsByMonth.getOrDefault(m, List.of());
            List<Expense> monthExpenses = expensesByMonth.getOrDefault(m, List.of());

            BigDecimal rent = monthPayments.stream().map(RentPayment::getAmountPaid).reduce(BigDecimal.ZERO, BigDecimal::add);
            BigDecimal exp = monthExpenses.stream().map(Expense::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);

            lineItems.add(ReportLineItemDto.builder()
                    .label(Month.of(m).name())
                    .rentCollected(rent)
                    .expenses(exp)
                    .netAmount(rent.subtract(exp))
                    .build());

            totalRent = totalRent.add(rent);
            totalExp = totalExp.add(exp);
        }

        return ReportDto.builder()
                .reportType("YEARLY_OVERVIEW")
                .period(String.valueOf(year))
                .totalRentCollected(totalRent)
                .totalExpenses(totalExp)
                .netCashFlow(totalRent.subtract(totalExp))
                .lineItems(lineItems)
                .build();
    }

    @Override
    public byte[] exportReportToCsv(ReportDto report) {
        StringBuilder sb = new StringBuilder();
        sb.append("Label,Rent Collected,Expenses,Net Amount\n");
        for (ReportLineItemDto item : report.getLineItems()) {
            sb.append(String.format("%s,%s,%s,%s\n",
                    item.getLabel(),
                    item.getRentCollected(),
                    item.getExpenses(),
                    item.getNetAmount()));
        }
        sb.append(String.format("\nTotal,%s,%s,%s\n",
                report.getTotalRentCollected(),
                report.getTotalExpenses(),
                report.getNetCashFlow()));
        return sb.toString().getBytes(StandardCharsets.UTF_8);
    }
}
