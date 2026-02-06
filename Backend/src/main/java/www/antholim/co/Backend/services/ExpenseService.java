package www.antholim.co.Backend.services;

import www.antholim.co.Backend.dto.model.ExpenseDto;
import www.antholim.co.Backend.dto.request.ExpenseRequestDto;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface ExpenseService {
    ExpenseDto createExpense(ExpenseRequestDto requestDto, UUID userId);
    ExpenseDto updateExpense(Long expenseId, ExpenseRequestDto requestDto, UUID userId);
    void deleteExpense(Long expenseId, UUID userId);
    List<ExpenseDto> getExpenses(UUID userId, Long propertyId, LocalDate startDate, LocalDate endDate);
}
