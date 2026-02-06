import { useState, useEffect } from 'react';
import { fetchGet } from '../../../../../services/FetchService';
import { IRentPayment } from '../../../../../interfaces/RentPayment';
import styles from './TenantDetailModal.module.css';

interface TenantDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    tenant: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        propertyName?: string;
        status?: string;
    } | null;
}

export default function TenantDetailModal({ isOpen, onClose, tenant }: TenantDetailModalProps) {
    const [payments, setPayments] = useState<IRentPayment[]>([]);

    useEffect(() => {
        if (isOpen && tenant) {
            const loadPayments = async () => {
                try {
                    const res = await fetchGet<any>('/api/v1/rent-payment');
                    const allPayments: IRentPayment[] = res?.payload || [];
                    setPayments(allPayments.filter(p => p.tenantId === tenant.id));
                } catch (error) {
                    console.error('Failed to load payments:', error);
                }
            };
            loadPayments();
        }
    }, [isOpen, tenant]);

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    if (!isOpen || !tenant) return null;

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>{tenant.firstName} {tenant.lastName}</h2>
                    <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                </div>
                <div className={styles.info}>
                    <p><strong>Email:</strong> {tenant.email}</p>
                    <p><strong>Phone:</strong> {tenant.phone}</p>
                    <p><strong>Property:</strong> {tenant.propertyName || 'N/A'}</p>
                    <p><strong>Status:</strong> <span className={tenant.status === 'ACTIVE' ? styles.active : styles.former}>{tenant.status || 'ACTIVE'}</span></p>
                </div>
                <h3 className={styles.sectionTitle}>Payment History</h3>
                {payments.length === 0 ? (
                    <p className={styles.noPayments}>No payment records found.</p>
                ) : (
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Month/Year</th>
                                    <th>Due</th>
                                    <th>Paid</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map(p => (
                                    <tr key={p.id}>
                                        <td>{p.month}/{p.year}</td>
                                        <td>{formatCurrency(p.amountDue)}</td>
                                        <td>{formatCurrency(p.amountPaid)}</td>
                                        <td><span className={styles[`status${p.paymentStatus}`]}>{p.paymentStatus}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
