import { Home, Users, FileText, PenToolIcon as Tool, BarChart, Building } from "lucide-react"
import styles from "./sidebar.module.css"
import { useNavigate } from "react-router-dom"

const navItems = [
  { icon: Home, label: "Dashboard", route : "/dashboard" },
  { icon: Building, label: "Properties", route : "/properties" },
  { icon: Users, label: "Tenants", route : "/tenants" },
  { icon: FileText, label: "Documents", route : "/dashboard"  },
  { icon: Tool, label: "Maintenance", route : "/dashboard" },
  { icon: BarChart, label: "Analytics", route : "/dashboard" },
]

export function Sidebar({setDashboardContent, dashboardContent}) {
  const navigate = useNavigate();
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

