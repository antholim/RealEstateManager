import { useState, useEffect } from 'react';
import { fetchPost, fetchPut } from '../../../../services/FetchService';
import { IExpense } from '../../../../interfaces/Expense';
import styles from './AddExpenseModal.module.css';

interface AddExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onExpenseAdded: () => void;
    properties: { id: number; name: string }[];
    editExpense?: IExpense | null;
}

export default function AddExpenseModal({ isOpen, onClose, onExpenseAdded, properties, editExpense }: AddExpenseModalProps) {
    const [formData, setFormData] = useState({
        propertyId: '',
        category: 'MAINTENANCE',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
    });

    useEffect(() => {
        if (editExpense) {
            setFormData({
                propertyId: String(editExpense.propertyId),
                category: editExpense.category,
                amount: String(editExpense.amount),
                date: editExpense.date,
                description: editExpense.description || ''
            });
        } else {
            setFormData({
                propertyId: '',
                category: 'MAINTENANCE',
                amount: '',
                date: new Date().toISOString().split('T')[0],
                description: ''
            });
        }
    }, [editExpense, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const body = {
                propertyId: Number(formData.propertyId),
                category: formData.category,
                amount: Number(formData.amount),
                date: formData.date,
                description: formData.description || null
            };
            if (editExpense) {
                await fetchPut(`/api/v1/expense/${editExpense.id}`, { body });
            } else {
                await fetchPost('/api/v1/expense', { body });
            }
            onExpenseAdded();
            onClose();
        } catch (error) {
            console.error('Failed to save expense:', error);
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
                    <h2>{editExpense ? 'Edit Expense' : 'Add Expense'}</h2>
                    <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label>Property *</label>
                        <select name="propertyId" value={formData.propertyId} onChange={handleChange} required>
                            <option value="">Select Property</option>
                            {properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Category *</label>
                            <select name="category" value={formData.category} onChange={handleChange} required>
                                <option value="MAINTENANCE">Maintenance</option>
                                <option value="TAXES">Taxes</option>
                                <option value="INSURANCE">Insurance</option>
                                <option value="UTILITIES">Utilities</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                        <div className={styles.field}>
                            <label>Amount *</label>
                            <input type="number" name="amount" value={formData.amount} onChange={handleChange} required step="0.01" />
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label>Date *</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                    </div>
                    <div className={styles.field}>
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows={2} />
                    </div>
                    <div className={styles.actions}>
                        <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
                        <button type="submit" className={styles.submitBtn}>{editExpense ? 'Update' : 'Add Expense'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
