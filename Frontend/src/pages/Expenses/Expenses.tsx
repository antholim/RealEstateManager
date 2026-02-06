import { useState, useEffect, useCallback } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import ExpenseTable from './components/ExpenseTable/ExpenseTable';
import AddExpenseModal from './components/AddExpenseModal/AddExpenseModal';
import { fetchGet } from '../../services/FetchService';
import { IExpense } from '../../interfaces/Expense';
import { DollarSign } from 'lucide-react';
import styles from './Expenses.module.css';

export default function Expenses() {
    const [expenses, setExpenses] = useState<IExpense[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editExpense, setEditExpense] = useState<IExpense | null>(null);
    const [properties, setProperties] = useState<{ id: number; name: string }[]>([]);
    const [filterProperty, setFilterProperty] = useState<string>('');
    const [filterCategory, setFilterCategory] = useState<string>('');

    const loadExpenses = useCallback(async () => {
        try {
            const params: Record<string, string> = {};
            if (filterProperty) params.propertyId = filterProperty;
            const res = await fetchGet<any>('/api/v1/expense', { queryParams: params });
            let expenseList = res?.payload || [];
            if (filterCategory) {
                expenseList = expenseList.filter((e: IExpense) => e.category === filterCategory);
            }
            setExpenses(expenseList);
        } catch (error) {
            console.error('Failed to load expenses:', error);
        }
    }, [filterProperty, filterCategory]);

    useEffect(() => {
        loadExpenses();
    }, [loadExpenses]);

    useEffect(() => {
        const loadProperties = async () => {
            try {
                const res = await fetchGet<any>('/api/v1/property');
                const list = res?.payload || [];
                setProperties(list.map((p: any) => ({ id: p.id, name: p.propertyName })));
            } catch (error) {
                console.error('Failed to load properties:', error);
            }
        };
        loadProperties();
    }, []);

    const handleEdit = (expense: IExpense) => {
        setEditExpense(expense);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditExpense(null);
    };

    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.content}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Expenses</h1>
                        <p className={styles.subtitle}>Track property expenses and costs</p>
                    </div>
                    <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
                        + Add Expense
                    </button>
                </div>

                <div className={styles.summaryCard}>
                    <DollarSign size={24} color="#dc2626" />
                    <div>
                        <p className={styles.summaryLabel}>Total Expenses</p>
                        <p className={styles.summaryValue}>{formatCurrency(totalExpenses)}</p>
                    </div>
                </div>

                <div className={styles.filters}>
                    <select value={filterProperty} onChange={(e) => setFilterProperty(e.target.value)} className={styles.filterSelect}>
                        <option value="">All Properties</option>
                        {properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                    <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className={styles.filterSelect}>
                        <option value="">All Categories</option>
                        <option value="MAINTENANCE">Maintenance</option>
                        <option value="TAXES">Taxes</option>
                        <option value="INSURANCE">Insurance</option>
                        <option value="UTILITIES">Utilities</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>

                <ExpenseTable expenses={expenses} onExpenseUpdated={loadExpenses} onEdit={handleEdit} />

                <AddExpenseModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onExpenseAdded={loadExpenses}
                    properties={properties}
                    editExpense={editExpense}
                />
            </div>
        </div>
    );
}
