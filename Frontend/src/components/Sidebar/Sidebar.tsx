import { Home, Users, Building, DollarSign, Receipt, BarChart } from "lucide-react"
import styles from "./sidebar.module.css"
import { useNavigate, useLocation } from "react-router-dom"

const navItems = [
  { icon: Home, label: "Dashboard", route: "/dashboard" },
  { icon: Building, label: "Properties", route: "/property" },
  { icon: DollarSign, label: "Rent Tracking", route: "/rent-tracking" },
  { icon: Receipt, label: "Expenses", route: "/expenses" },
  { icon: BarChart, label: "Reports", route: "/reports" },
]

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <h1 className={styles.title}>PropManager</h1>
            </div>
            <nav className={styles.nav}>
                <ul>
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <div
                                onClick={() => navigate(item.route)}
                                className={`${styles.navItem} ${location.pathname === item.route ? styles.active : ""}`}
                            >
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
