import { Home, Users, FileText, PenToolIcon as Tool, BarChart } from "lucide-react"
import styles from "./sidebar.module.css"

const navItems = [
  { icon: Home, label: "Dashboard" },
  { icon: Users, label: "Tenants" },
  { icon: FileText, label: "Documents",  },
  { icon: Tool, label: "Maintenance" },
  { icon: BarChart, label: "Analytics" },
]

export function Sidebar({setDashboardContent, dashboardContent}) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h1 className={styles.title}>PropManager</h1>
      </div>
      <nav className={styles.nav}>
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <div onClick={()=> {
                setDashboardContent(item.label)
              }} className={`${styles.navItem} ${item.label === dashboardContent ? styles.active : ""}`}>
                <item.icon className={styles.icon} />
                {item.label}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

