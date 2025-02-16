import { Card } from "./ui/card"
import { RevenueChart } from "./revenue-chart"
import { MaintenanceList } from "./maintenance-list"
import styles from "./dashboard-content.module.css"

export function DashboardContent() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dashboard</h2>
      <div className={styles.metricsGrid}>
        <MetricCard title="Total Properties" value="15" />
        <MetricCard title="Occupancy Rate" value="92%" />
        <MetricCard title="Total Revenue" value="$52,500" />
        <MetricCard title="Pending Requests" value="7" />
      </div>
      <div className={styles.chartsGrid}>
        <Card className={styles.card}>
          <h3 className={styles.cardTitle}>Revenue Trend</h3>
          <RevenueChart />
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

