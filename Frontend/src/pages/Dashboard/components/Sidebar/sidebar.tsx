import { Home, Users, Building, DollarSign, Receipt, BarChart } from "lucide-react"
import styles from "./sidebar.module.css"
import { useNavigate } from "react-router-dom"

const navItems = [
  { icon: Home, label: "Dashboard", route: "/dashboard", isDashboardContent: true },
  { icon: Building, label: "Properties", route: "/property", isDashboardContent: false },
  { icon: Users, label: "Tenants", route: "/dashboard", isDashboardContent: true },
  { icon: DollarSign, label: "Rent Tracking", route: "/rent-tracking", isDashboardContent: false },
  { icon: Receipt, label: "Expenses", route: "/expenses", isDashboardContent: false },
  { icon: BarChart, label: "Reports", route: "/reports", isDashboardContent: false },
]

export function Sidebar({setDashboardContent, dashboardContent}: {setDashboardContent: (content: string) => void, dashboardContent: string}) {
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
                if (item.isDashboardContent) {
                  setDashboardContent(item.label);
                } else {
                  navigate(item.route);
                }
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
