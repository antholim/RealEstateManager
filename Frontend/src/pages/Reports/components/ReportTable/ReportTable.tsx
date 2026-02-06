import { IReportLineItem } from '../../../../interfaces/Report';
import styles from './ReportTable.module.css';

interface ReportTableProps {
    lineItems: IReportLineItem[];
}

export default function ReportTable({ lineItems }: ReportTableProps) {
    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

    if (lineItems.length === 0) {
        return <div className={styles.empty}>No data for this period.</div>;
    }

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Label</th>
                        <th>Rent Collected</th>
                        <th>Expenses</th>
                        <th>Net Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {lineItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.label}</td>
                            <td className={styles.positive}>{formatCurrency(item.rentCollected)}</td>
                            <td className={styles.negative}>{formatCurrency(item.expenses)}</td>
                            <td className={item.netAmount >= 0 ? styles.positive : styles.negative}>
                                {formatCurrency(item.netAmount)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
