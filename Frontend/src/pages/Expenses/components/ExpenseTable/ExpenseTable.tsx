import { IExpense } from '../../../../interfaces/Expense';
import { fetchDelete } from '../../../../services/FetchService';
import styles from './ExpenseTable.module.css';

interface ExpenseTableProps {
    expenses: IExpense[];
    onExpenseUpdated: () => void;
    onEdit: (expense: IExpense) => void;
}

export default function ExpenseTable({ expenses, onExpenseUpdated, onEdit }: ExpenseTableProps) {
    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this expense?')) return;
        try {
            await fetchDelete(`/api/v1/expense/${id}`);
            onExpenseUpdated();
        } catch (error) {
            console.error('Failed to delete expense:', error);
        }
    };

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'MAINTENANCE': return '#2563eb';
            case 'TAXES': return '#dc2626';
            case 'INSURANCE': return '#9333ea';
            case 'UTILITIES': return '#ca8a04';
            case 'OTHER': return '#6b7280';
            default: return '#6b7280';
        }
    };

    if (expenses.length === 0) {
        return <div className={styles.empty}>No expenses found.</div>;
    }

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Property</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => (
                        <tr key={expense.id}>
                            <td>{expense.date}</td>
                            <td>{expense.propertyName}</td>
                            <td>
                                <span className={styles.badge} style={{ backgroundColor: getCategoryColor(expense.category) + '20', color: getCategoryColor(expense.category) }}>
                                    {expense.category}
                                </span>
                            </td>
                            <td>{expense.description || '-'}</td>
                            <td className={styles.amount}>{formatCurrency(expense.amount)}</td>
                            <td>
                                <div className={styles.actionBtns}>
                                    <button className={styles.editBtn} onClick={() => onEdit(expense)}>Edit</button>
                                    <button className={styles.deleteBtn} onClick={() => handleDelete(expense.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
