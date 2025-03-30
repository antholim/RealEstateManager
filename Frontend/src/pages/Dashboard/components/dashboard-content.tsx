import { Card } from "./ui/card"
import RevenueChart from "./RevenueChart"
import { MaintenanceList } from "./maintenance-list"
import styles from "./dashboard-content.module.css"

const generateCurrentMonthsData = () => {
  const months = [];
  const currentDate = new Date();
  
  // Get the current month and the 5 months before it (total of 6 months)
  for (let i = 12; i >= 0; i--) {
    const date = new Date();
    date.setMonth(currentDate.getMonth() - i);
    
    const monthName = date.toLocaleString('default', { month: 'short' });
    months.push({
      month: monthName,
      revenue: Math.floor(Math.random() * 7000) + 3000 // Random revenue between 3000 and 10000
    });
  }
  
  return months;
};
export function DashboardContent() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dashboard</h2>
      <div className={styles.metricsGrid}>
        <MetricCard title="Total Tenants" value="8" />
        <MetricCard title="Occupancy Rate" value="100%" />
        <MetricCard title="Total Revenue" value="$52,500" />
        <MetricCard title="Pending Requests" value="7" />
      </div>
      <div className={styles.chartsGrid}>
        <Card className={styles.card}>
          <h3 className={styles.cardTitle}>Revenue Trend</h3>
          <RevenueChart monthData={generateCurrentMonthsData()}/>
        </Card>
        <Card className={styles.card}>
          <h3 className={styles.cardTitle}>Recent Maintenance Requests</h3>
          <MaintenanceList />
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

