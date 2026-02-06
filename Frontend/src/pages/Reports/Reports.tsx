import { useState, useCallback, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import MonthFilter from '../RentTracking/components/MonthFilter/MonthFilter';
import ReportTable from './components/ReportTable/ReportTable';
import { fetchGet } from '../../services/FetchService';
import { IReport } from '../../interfaces/Report';
import { DollarSign, TrendingUp, TrendingDown, Download } from 'lucide-react';
import styles from './Reports.module.css';

const reportTypes = [
    { value: 'monthly', label: 'Monthly Summary', endpoint: '/api/v1/report/monthly' },
    { value: 'by-property', label: 'By Property', endpoint: '/api/v1/report/by-property' },
    { value: 'by-tenant', label: 'By Tenant', endpoint: '/api/v1/report/by-tenant' },
    { value: 'yearly', label: 'Yearly Overview', endpoint: '/api/v1/report/yearly' },
];

export default function Reports() {
    const now = new Date();
    const [month, setMonth] = useState(now.getMonth() + 1);
    const [year, setYear] = useState(now.getFullYear());
    const [reportType, setReportType] = useState('monthly');
    const [report, setReport] = useState<IReport | null>(null);
    const [loading, setLoading] = useState(false);

    const loadReport = useCallback(async () => {
        setLoading(true);
        try {
            const config = reportTypes.find(r => r.value === reportType);
            if (!config) return;

            const params: Record<string, string | number> = { year };
            if (reportType !== 'yearly') {
                params.month = month;
            }

            const res = await fetchGet<any>(config.endpoint, { queryParams: params });
            setReport(res?.payload || null);
        } catch (error) {
            console.error('Failed to load report:', error);
        } finally {
            setLoading(false);
        }
    }, [reportType, month, year]);

    useEffect(() => {
        loadReport();
    }, [loadReport]);

    const handleExport = () => {
        const exportType = reportType === 'monthly' ? 'MONTHLY'
            : reportType === 'by-property' ? 'BY_PROPERTY'
            : reportType === 'by-tenant' ? 'BY_TENANT'
            : 'YEARLY';

        let url = `http://localhost:8080/api/v1/report/export?type=${exportType}&year=${year}`;
        if (reportType !== 'yearly') {
            url += `&month=${month}`;
        }
        window.open(url, '_blank');
    };

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount || 0);

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.content}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Financial Reports</h1>
                        <p className={styles.subtitle}>Analyze your rental income and expenses</p>
                    </div>
                    <button className={styles.exportBtn} onClick={handleExport}>
                        <Download size={16} />
                        Download CSV
                    </button>
                </div>

                <div className={styles.filters}>
                    <select
                        className={styles.typeSelect}
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                    >
                        {reportTypes.map(r => (
                            <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                    </select>
                    <MonthFilter month={month} year={year} onMonthChange={setMonth} onYearChange={setYear} />
                </div>

                {report && (
                    <div className={styles.summaryGrid}>
                        <div className={styles.summaryCard}>
                            <DollarSign size={24} color="#16a34a" />
                            <div>
                                <p className={styles.summaryLabel}>Rent Collected</p>
                                <p className={styles.summaryValueGreen}>{formatCurrency(report.totalRentCollected)}</p>
                            </div>
                        </div>
                        <div className={styles.summaryCard}>
                            <TrendingDown size={24} color="#dc2626" />
                            <div>
                                <p className={styles.summaryLabel}>Expenses</p>
                                <p className={styles.summaryValueRed}>{formatCurrency(report.totalExpenses)}</p>
                            </div>
                        </div>
                        <div className={styles.summaryCard}>
                            <TrendingUp size={24} color="#2563eb" />
                            <div>
                                <p className={styles.summaryLabel}>Net Profit</p>
                                <p className={report.netCashFlow >= 0 ? styles.summaryValueGreen : styles.summaryValueRed}>
                                    {formatCurrency(report.netCashFlow)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {loading ? (
                    <p>Loading report...</p>
                ) : report ? (
                    <ReportTable lineItems={report.lineItems} />
                ) : (
                    <p>No report data available.</p>
                )}
            </div>
        </div>
    );
}
