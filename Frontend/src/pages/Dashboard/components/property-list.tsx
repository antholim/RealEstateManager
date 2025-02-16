import { Card } from "../components/ui/card"
import styles from "./property-list.module.css"
import { useState } from "react"
import { AddProperty } from "./add-property"
import { Trash2 } from "lucide-react"


interface Property {
    id: number
    name: string
    address: string
    units: number
    occupancyRate: number
    tenants:[]
  }
const propertiesInitial:Property[] = [
  { id: 1, name: "Appartment Hochelaga", address: "920 Rue Bossuet", units: 8, occupancyRate: 100, tenants:[] },
]

export function PropertyList() {

    const [properties, setProperties] = useState<Property[]>(propertiesInitial)
  
    const handleDelete = (id: number) => {
      setProperties(properties.filter((property) => property.id !== id))
    }
  
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>All Properties</h2>
        <div className={styles.grid}>
          {properties.map((property) => (
            <Card key={property.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.propertyName}>{property.name}</h3>
                <button
                  onClick={() => handleDelete(property.id)}
                  className={styles.deleteButton}
                  aria-label={`Delete ${property.name}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <p className={styles.propertyInfo}>
                <strong>Address:</strong> {property.address}
              </p>
              <p className={styles.propertyInfo}>
                <strong>Total Units:</strong> {property.units}
              </p>
              <p className={styles.propertyInfo}>
                <strong>Occupancy Rate:</strong> {property.occupancyRate}%
              </p>
            </Card>
          ))}
          <AddProperty/>
        </div>
      </div>
    )
  }