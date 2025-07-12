import { IProperty, Tenant } from "../../../../interfaces/Property";
import { Card } from "../../../Dashboard/components/ui/card";
import styles from "./PropertyCard.module.css"
import { Trash2, Users, DollarSign, MapPin, Building, MoreVertical } from "lucide-react"


interface PropertyCardProps {
    property: IProperty;
    onDelete: (id: string) => void;
    setSelectProperty: (id: string) => void;
    setIsPropertyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    openUnitModal: (property: IProperty) => void;
    openLeaseModal: (property: IProperty) => void;
}

function PropertyCard({ property, onDelete, setSelectProperty, setIsPropertyModalOpen, openUnitModal, openLeaseModal}: PropertyCardProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getPropertyTypeColor = (propertyType: string) => {
        switch (propertyType?.toLowerCase()) {
            case 'apartment':
                return '#3b82f6';
            case 'house':
                return '#10b981';
            case 'commercial':
                return '#f59e0b';
            default:
                return '#6b7280';
        }
    };

    const occupancyRate = property.totalUnits > 0 ? Math.round((property.occupiedUnits / property.totalUnits) * 100) : 0;

    return (
        <Card className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.propertyInfo}>
                    <h3 className={styles.propertyName}>{property.propertyName}</h3>
                    <div className={styles.propertyType}>
                        <Building size={14} />
                        <span style={{ color: getPropertyTypeColor(property?.propertyType) }}>
                            {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setSelectProperty(property.id)
                        setIsPropertyModalOpen(true)
                    }}
                    aria-label={`Delete ${property.propertyName}`}
                    className={styles.viewProperty}
                >
                    <MoreVertical size={18} />
                </button>
                <button
                    onClick={() => onDelete(property.id)}
                    className={styles.deleteButton}
                    aria-label={`Delete ${property.propertyName}`}
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <div className={styles.propertyDetails}>
                <div className={styles.detailItem}>
                    <MapPin size={16} />
                    <span>{property.address}</span>
                </div>

                <div className={styles.statsRow}>
                    <div className={styles.statItem}>
                        <Users size={16} />
                        <div>
                            <span className={styles.statValue}>{property.occupiedUnits}/{property.totalUnits}</span>
                            <span className={styles.statLabel}>Units</span>
                        </div>
                    </div>
                    <div className={styles.statItem}>
                        <DollarSign size={16} />
                        <div>
                            <span className={styles.statValue}>{formatCurrency(property.monthlyRevenue)}</span>
                            <span className={styles.statLabel}>Monthly</span>
                        </div>
                    </div>
                </div>

            </div>

                <div className={styles.addSection}>
                            <button 
                            type="button" 
                            className={styles.addUnitButton} 
                            onClick={() => openUnitModal(property)}
                        >
                            Add Unit
                        </button>
                            <button 
                            type="button" 
                            className={styles.addLeaseButton} 
                            onClick={() => openLeaseModal(property)}
                        >
                            Add Lease
                        </button>
                </div>
            <div className={styles.cardActions}>
            </div>
        </Card>
    )
}

export default PropertyCard;