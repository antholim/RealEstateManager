package www.antholim.co.Backend.services.implementations;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import www.antholim.co.Backend.dto.model.ExpenseDto;
import www.antholim.co.Backend.dto.request.ExpenseRequestDto;
import www.antholim.co.Backend.exceptions.custom.ResourceNotFoundException;
import www.antholim.co.Backend.mappers.ExpenseMapper;
import www.antholim.co.Backend.models.Expense;
import www.antholim.co.Backend.models.Property;
import www.antholim.co.Backend.models.User;
import www.antholim.co.Backend.repository.ExpenseRepository;
import www.antholim.co.Backend.repository.PropertyRepository;
import www.antholim.co.Backend.repository.UserRepository;
import www.antholim.co.Backend.services.ExpenseService;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;
    private final ExpenseMapper expenseMapper;

    @Override
    public ExpenseDto createExpense(ExpenseRequestDto requestDto, UUID userId) {
        User user = userRepository.getReferenceById(userId);
        Property property = propertyRepository.findById(requestDto.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        Expense expense = new Expense();
        expense.setProperty(property)
                .setUser(user)
                .setCategory(requestDto.getCategory())
                .setAmount(requestDto.getAmount())
                .setDate(requestDto.getDate())
                .setDescription(requestDto.getDescription());

        Expense saved = expenseRepository.save(expense);
        return expenseMapper.toDto(saved);
    }

    @Override
    public ExpenseDto updateExpense(Long expenseId, ExpenseRequestDto requestDto, UUID userId) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found"));

        if (requestDto.getPropertyId() != null) {
            Property property = propertyRepository.findById(requestDto.getPropertyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Property not found"));
            expense.setProperty(property);
        }
        if (requestDto.getCategory() != null) expense.setCategory(requestDto.getCategory());
        if (requestDto.getAmount() != null) expense.setAmount(requestDto.getAmount());
        if (requestDto.getDate() != null) expense.setDate(requestDto.getDate());
        if (requestDto.getDescription() != null) expense.setDescription(requestDto.getDescription());

        Expense saved = expenseRepository.save(expense);
        return expenseMapper.toDto(saved);
    }

    @Override
    public void deleteExpense(Long expenseId, UUID userId) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found"));
        expenseRepository.delete(expense);
    }

    @Override
    public List<ExpenseDto> getExpenses(UUID userId, Long propertyId, LocalDate startDate, LocalDate endDate) {
        if (propertyId != null) {
            return expenseMapper.toDtoList(expenseRepository.findByUserIdAndPropertyId(userId, propertyId));
        }
        if (startDate != null && endDate != null) {
            return expenseMapper.toDtoList(expenseRepository.findByUserIdAndDateRange(userId, startDate, endDate));
        }
        return expenseMapper.toDtoList(expenseRepository.findByUserId(userId));
    }
}
