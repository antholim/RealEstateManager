import { useState, useEffect, useCallback } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import MonthFilter from './components/MonthFilter/MonthFilter';
import PaymentTable from './components/PaymentTable/PaymentTable';
import AddPaymentModal from './components/AddPaymentModal/AddPaymentModal';
import { fetchGet } from '../../services/FetchService';
import { IRentPayment, IMonthlyIncome } from '../../interfaces/RentPayment';
import { DollarSign, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import styles from './RentTracking.module.css';

export default function RentTracking() {
    const now = new Date();
    const [month, setMonth] = useState(now.getMonth() + 1);
    const [year, setYear] = useState(now.getFullYear());
    const [payments, setPayments] = useState<IRentPayment[]>([]);
    const [summary, setSummary] = useState<IMonthlyIncome | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tenants, setTenants] = useState<{ id: number; name: string }[]>([]);
    const [properties, setProperties] = useState<{ id: number; name: string }[]>([]);

    const loadData = useCallback(async () => {
        try {
            const [paymentsRes, summaryRes] = await Promise.all([
                fetchGet<any>('/api/v1/rent-payment', { queryParams: { month, year } }),
                fetchGet<any>('/api/v1/rent-payment/monthly-summary', { queryParams: { month, year } })
            ]);
            setPayments(paymentsRes?.payload || []);
            setSummary(summaryRes?.payload || null);
        } catch (error) {
            console.error('Failed to load rent data:', error);
        }
    }, [month, year]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useEffect(() => {
        const loadOptions = async () => {
            try {
                const [tenantsRes, propertiesRes] = await Promise.all([
                    fetchGet<any>('/api/v1/tenant'),
                    fetchGet<any>('/api/v1/property')
                ]);
                const tenantList = tenantsRes?.payload || [];
                const propertyList = propertiesRes?.payload || [];
                setTenants(tenantList.map((t: any) => ({ id: t.id, name: `${t.firstName} ${t.lastName}` })));
                setProperties(propertyList.map((p: any) => ({ id: p.id, name: p.propertyName })));
            } catch (error) {
                console.error('Failed to load options:', error);
            }
        };
        loadOptions();
    }, []);

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount || 0);

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.headerTop}>
                        <div>
                            <h1 className={styles.title}>Rent Tracking</h1>
                            <p className={styles.subtitle}>Monitor and manage rent payments</p>
                        </div>
                        <div className={styles.headerActions}>
                            <MonthFilter month={month} year={year} onMonthChange={setMonth} onYearChange={setYear} />
                            <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
                                + Record Payment
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ backgroundColor: '#dbeafe' }}>
                            <DollarSign size={20} color="#2563eb" />
                        </div>
                        <div>
                            <p className={styles.statLabel}>Expected</p>
                            <p className={styles.statValue}>{formatCurrency(summary?.expectedIncome || 0)}</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ backgroundColor: '#dcfce7' }}>
                            <CheckCircle size={20} color="#16a34a" />
                        </div>
                        <div>
                            <p className={styles.statLabel}>Collected</p>
                            <p className={styles.statValue}>{formatCurrency(summary?.actualIncome || 0)}</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ backgroundColor: '#fee2e2' }}>
                            <AlertTriangle size={20} color="#dc2626" />
                        </div>
                        <div>
                            <p className={styles.statLabel}>Outstanding</p>
                            <p className={styles.statValue}>{formatCurrency(summary?.outstanding || 0)}</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ backgroundColor: '#fef9c3' }}>
                            <Clock size={20} color="#ca8a04" />
                        </div>
                        <div>
                            <p className={styles.statLabel}>Paid / Total</p>
                            <p className={styles.statValue}>{summary?.paidCount || 0} / {(summary?.paidCount || 0) + (summary?.partialCount || 0) + (summary?.unpaidCount || 0)}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.tableSection}>
                    <PaymentTable payments={payments} onPaymentUpdated={loadData} />
                </div>

                <AddPaymentModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onPaymentAdded={loadData}
                    tenants={tenants}
                    properties={properties}
                />
            </div>
        </div>
    );
}
