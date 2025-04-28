import styles from "./MaintenanceList.module.css"

const maintenanceRequests = [
  { id: 1, issue: "Leaky faucet", status: "Pending", priority: "Low" },
  { id: 2, issue: "Broken AC", status: "In Progress", priority: "High" },
  { id: 3, issue: "Clogged drain", status: "Completed", priority: "Medium" },
  { id: 4, issue: "Faulty light switch", status: "Pending", priority: "Low" },
]

export function MaintenanceList() {
  return (
    <ul className={styles.list}>
      {maintenanceRequests.map((request) => (
        <li key={request.id} className={styles.item}>
          <div className={styles.details}>
            <p className={styles.issue}>{request.issue}</p>
            <p className={styles.priority}>Priority: {request.priority}</p>
          </div>
          <span className={`${styles.badge} ${styles[request.status.toLowerCase()]}`}>{request.status}</span>
        </li>
      ))}
    </ul>
  )
}

