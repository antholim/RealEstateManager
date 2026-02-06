import { IRentPayment } from '../../../../interfaces/RentPayment';
import { fetchPut } from '../../../../services/FetchService';
import styles from './PaymentTable.module.css';

interface PaymentTableProps {
    payments: IRentPayment[];
    onPaymentUpdated: () => void;
}

export default function PaymentTable({ payments, onPaymentUpdated }: PaymentTableProps) {
    const handleMarkPaid = async (paymentId: number) => {
        try {
            await fetchPut(`/api/v1/rent-payment/${paymentId}/mark-paid`, {
                queryParams: { paymentMethod: 'TRANSFER' }
            });
            onPaymentUpdated();
        } catch (error) {
            console.error('Failed to mark as paid:', error);
        }
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'PAID': return styles.statusPaid;
            case 'PARTIAL': return styles.statusPartial;
            case 'UNPAID': return styles.statusUnpaid;
            default: return '';
        }
    };

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

    if (payments.length === 0) {
        return <div className={styles.empty}>No payments found for this period.</div>;
    }

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Tenant</th>
                        <th>Property</th>
                        <th>Amount Due</th>
                        <th>Amount Paid</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment.id} className={getStatusClass(payment.paymentStatus)}>
                            <td>{payment.tenantName}</td>
                            <td>{payment.propertyName}</td>
                            <td>{formatCurrency(payment.amountDue)}</td>
                            <td>{formatCurrency(payment.amountPaid)}</td>
                            <td>{payment.dueDate}</td>
                            <td>
                                <span className={`${styles.badge} ${getStatusClass(payment.paymentStatus)}`}>
                                    {payment.paymentStatus}
                                </span>
                            </td>
                            <td>
                                {payment.paymentStatus !== 'PAID' && (
                                    <button
                                        className={styles.markPaidBtn}
                                        onClick={() => handleMarkPaid(payment.id)}
                                    >
                                        Mark as Paid
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
