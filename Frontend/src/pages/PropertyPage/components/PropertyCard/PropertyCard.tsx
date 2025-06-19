import { Card } from "../../../Dashboard/components/ui/card";
import styles from "./PropertyCard.module.css"
import { Trash2 } from "lucide-react"

interface Property {
    id: number
    name: string
    address: string
    units: number
    occupancyRate: number
    tenants:[]
  }


function PropertyCard({handleDelete, property}) {
    return (
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
          )
}
export default PropertyCard;