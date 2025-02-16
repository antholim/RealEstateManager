import { Sidebar } from "./components/sidebar"
import { DashboardContent } from "./components/dashboard-content"
import styles from "./Dashboard.module.css"
import { useState } from "react"

export default function DashboardPage() {
  const [dashboardContent, setDashboardContent] = useState("");
  let content = <DashboardContent />
  console.log(dashboardContent)
  if (dashboardContent === "Tenants") {
    content = <>test</>
  }
  return (
    <div className={styles.container}>
      <Sidebar dashboardContent={dashboardContent} setDashboardContent={setDashboardContent}/>
      <main className={styles.main}>
        {content}
      </main>
    </div>
  )
}

