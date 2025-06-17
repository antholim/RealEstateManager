import { Home, Users, FileText, PenToolIcon as Tool, BarChart, Building } from "lucide-react"
import styles from "./sidebar.module.css"

const navItems = [
  { icon: Home, label: "Dashboard" },
  { icon: Building, label: "Properties" },
  { icon: Users, label: "Tenants" },
  { icon: FileText, label: "Documents",  },
  { icon: Tool, label: "Maintenance" },
  { icon: BarChart, label: "Analytics" },
]

export default function Sidebar() {
    const sidebarContent = null
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
                // setSidebarContent(item.label)
              }} className={`${styles.navItem} ${item.label === sidebarContent ? styles.active : ""}`}>
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

