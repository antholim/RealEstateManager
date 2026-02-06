import { useState } from 'react';
import { fetchPost } from '../../../../services/FetchService';
import styles from './AddPaymentModal.module.css';

interface AddPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPaymentAdded: () => void;
    tenants: { id: number; name: string }[];
    properties: { id: number; name: string }[];
}

export default function AddPaymentModal({ isOpen, onClose, onPaymentAdded, tenants, properties }: AddPaymentModalProps) {
    const now = new Date();
    const [formData, setFormData] = useState({
        tenantId: '',
        propertyId: '',
        amountDue: '',
        amountPaid: '0',
        paymentStatus: 'UNPAID',
        paymentMethod: '',
        dueDate: '',
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        notes: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetchPost('/api/v1/rent-payment', {
                body: {
                    tenantId: Number(formData.tenantId),
                    propertyId: Number(formData.propertyId),
                    amountDue: Number(formData.amountDue),
                    amountPaid: Number(formData.amountPaid),
                    paymentStatus: formData.paymentStatus,
                    paymentMethod: formData.paymentMethod || null,
                    dueDate: formData.dueDate,
                    paymentDate: formData.paymentStatus === 'PAID' ? new Date().toISOString().split('T')[0] : null,
                    month: formData.month,
                    year: formData.year,
                    notes: formData.notes || null
                }
            });
            onPaymentAdded();
            onClose();
        } catch (error) {
            console.error('Failed to create payment:', error);
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>Record Payment</h2>
                    <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Tenant *</label>
                            <select name="tenantId" value={formData.tenantId} onChange={handleChange} required>
                                <option value="">Select Tenant</option>
                                {tenants.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </select>
                        </div>
                        <div className={styles.field}>
                            <label>Property *</label>
                            <select name="propertyId" value={formData.propertyId} onChange={handleChange} required>
                                <option value="">Select Property</option>
                                {properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Amount Due *</label>
                            <input type="number" name="amountDue" value={formData.amountDue} onChange={handleChange} required step="0.01" />
                        </div>
                        <div className={styles.field}>
                            <label>Amount Paid</label>
                            <input type="number" name="amountPaid" value={formData.amountPaid} onChange={handleChange} step="0.01" />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Due Date *</label>
                            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
                        </div>
                        <div className={styles.field}>
                            <label>Status</label>
                            <select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange}>
                                <option value="UNPAID">Unpaid</option>
                                <option value="PARTIAL">Partial</option>
                                <option value="PAID">Paid</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Payment Method</label>
                            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                                <option value="">Select Method</option>
                                <option value="CASH">Cash</option>
                                <option value="TRANSFER">Transfer</option>
                                <option value="CHEQUE">Cheque</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                        <div className={styles.field}>
                            <label>Month / Year</label>
                            <div className={styles.monthYear}>
                                <input type="number" name="month" value={formData.month} onChange={handleChange} min={1} max={12} />
                                <input type="number" name="year" value={formData.year} onChange={handleChange} min={2020} max={2030} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label>Notes</label>
                        <textarea name="notes" value={formData.notes} onChange={handleChange} rows={2} />
                    </div>
                    <div className={styles.actions}>
                        <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
                        <button type="submit" className={styles.submitBtn}>Record Payment</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
