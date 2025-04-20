import { Card } from "../ui/card"
import styles from "./tenantList.module.css"
import { ITenant } from "../../interfaces/interfaces"
import { AddTenant } from "./addTenant"
import { Select } from "../ui/select"

const tenants:ITenant[] = [
  {
    id: 1,
    name: "John Doe",
    phone: "123-456-7890",
    property: "Apartment Hochelaga",
    unit: "#1",
    rent:"1200"
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "234-567-8901",
    property: "Apartment Hochelaga",
    unit: "#2",
    rent:"1200"
  },
  {
    id: 3,
    name: "Bob Johnson",
    phone: "345-678-9012",
    property: "Apartment Hochelaga",
    unit: "#3",
    rent:"1200"
  },
  {
    id: 4,
    name: "Alice Brown",
    phone: "456-789-0123",
    property: "Apartment Hochelaga",
    unit: "#4",
    rent:"1200"
  },
  {
    id: 5,
    name: "Charlie Davis",
    phone: "567-890-1234",
    property: "Apartment Hochelaga",
    unit: "#5",
    rent:"1200"
  },
  {
    id: 6,
    name: "Charlie Davis",
    phone: "567-890-1234",
    property: "Apartment Hochelaga",
    unit: "#6",
    rent:"1200"
  },
  {
    id: 7,
    name: "Charlie Davis",
    phone: "567-890-1234",
    property: "Apartment Hochelaga",
    unit: "#7",
    rent:"1200"
  },
  {
    id: 8,
    name: "Charlie Davis",
    phone: "567-890-1234",
    property: "Apartment Hochelaga",
    unit: "#8",
    rent:"1200"
  },
]

const options = [
  {value : "All Tenants", label : "All Tenants"},
  {value : "Apartment Hochelaga", label : "Apartment Hochelaga"}
]

export function TenantList() {
  return (
    <div className={styles.container}>
      <Select options={options} onChange={()=> {
        
      }}/>
      <div className={styles.grid}>
        {tenants.map((tenant:ITenant) => (
          <Card key={tenant.id} className={styles.card}>
            <h3 className={styles.tenantName}>{tenant.name}</h3>
            <p className={styles.tenantInfo}>
              <strong>Email:</strong> {tenant?.email || "N/A"}
            </p>
            <p className={styles.tenantInfo}>
              <strong>Phone:</strong> {tenant.phone}
            </p>
            <p className={styles.tenantInfo}>
              <strong>Property:</strong> {tenant.property}
            </p>
            <p className={styles.tenantInfo}>
              <strong>Unit:</strong> {tenant.unit}
            </p>
            <p className={styles.tenantInfo}>
              <strong>Rent:</strong> {tenant.rent} $
            </p>
          </Card>
        ))}
      </div>
      <AddTenant/>
    </div>
  )
}

