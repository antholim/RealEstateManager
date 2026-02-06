import { useState, useEffect } from 'react';
import { Card } from "../ui/card"
import MonthlyRentChart from "../MonthlyRentChart/MonthlyRentChart"
import PaidUnpaidChart from "../PaidUnpaidChart/PaidUnpaidChart"
import { fetchGet } from "../../../../services/FetchService"
import { IDashboardSummary } from "../../../../interfaces/Dashboard"
import styles from "./DashboardContent.module.css"

export function DashboardContent() {
  const [summary, setSummary] = useState<IDashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const res = await fetchGet<any>('/api/v1/dashboard/summary');
        setSummary(res?.payload || null);
      } catch (error) {
        console.error('Failed to load dashboard summary:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSummary();
  }, []);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount || 0);

  if (loading) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Dashboard</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dashboard</h2>
      <div className={styles.metricsGrid}>
        <MetricCard title="Total Rent" value={formatCurrency(summary?.totalRentThisMonth || 0)} />
        <MetricCard title="Collected" value={formatCurrency(summary?.amountCollected || 0)} />
        <MetricCard title="Outstanding" value={formatCurrency(summary?.amountOutstanding || 0)} />
        <MetricCard title="Properties" value={String(summary?.propertyCount || 0)} />
        <MetricCard title="Tenants" value={String(summary?.tenantCount || 0)} />
        <MetricCard title="Overdue" value={String(summary?.overdueCount || 0)} />
      </div>
      <div className={styles.chartsGrid}>
        <Card className={styles.card}>
          <h3 className={styles.cardTitle}>Monthly Rent (Last 12 Months)</h3>
          <MonthlyRentChart data={summary?.monthlyHistory || []} />
        </Card>
        <Card className={styles.card}>
          <h3 className={styles.cardTitle}>Payment Status</h3>
          <PaidUnpaidChart paidRatio={summary?.paidRatio || 0} unpaidRatio={summary?.unpaidRatio || 0} />
        </Card>
      </div>
    </div>
  )
}

function MetricCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className={styles.metricCard}>
      <h3 className={styles.metricTitle}>{title}</h3>
      <div className={styles.metricValue}>{value}</div>
    </Card>
  )
}
