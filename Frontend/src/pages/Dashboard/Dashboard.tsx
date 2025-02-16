import { Sidebar } from "./components/sidebar"
import { DashboardContent } from "./components/dashboard-content"
import styles from "./Dashboard.module.css"

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <DashboardContent />
      </main>
    </div>
  )
}

