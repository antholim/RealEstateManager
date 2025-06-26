import { Card } from "../../../Dashboard/components/ui/card";
import styles from "./PropertyCard.module.css"
import { Trash2, Users, DollarSign, MapPin, Building } from "lucide-react"

interface Tenant {
    id: string;
    name: string;
    email: string;
    phone: string;
    leaseStart: string;
    leaseEnd: string;
    rentAmount: number;
    unit?: string;
}

interface Property {
    id: string;
    name: string;
    address: string;
    type: string;
    totalUnits: number;
    occupiedUnits: number;
    monthlyRevenue: number;
    tenants: Tenant[];
}

interface PropertyCardProps {
    property: Property;
    onDelete: (id: string) => void;
    onAddTenant: (propertyId: string, newTenant: Tenant) => void;
}

function PropertyCard({ property, onDelete, onAddTenant }: PropertyCardProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getPropertyTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
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
                    <h3 className={styles.propertyName}>{property.name}</h3>
                    <div className={styles.propertyType}>
                        <Building size={14} />
                        <span style={{ color: getPropertyTypeColor(property.type) }}>
                            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => onDelete(property.id)}
                    className={styles.deleteButton}
                    aria-label={`Delete ${property.name}`}
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

                <div className={styles.occupancyBar}>
                    <div className={styles.occupancyInfo}>
                        <span>Occupancy Rate</span>
                        <span>{occupancyRate}%</span>
                    </div>
                    <div className={styles.progressBar}>
                        <div 
                            className={styles.progressFill} 
                            style={{ width: `${occupancyRate}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {property.tenants.length > 0 && (
                <div className={styles.tenantsSection}>
                    <h4 className={styles.tenantsTitle}>Current Tenants</h4>
                    <div className={styles.tenantsList}>
                        {property.tenants.slice(0, 3).map((tenant) => (
                            <div key={tenant.id} className={styles.tenantItem}>
                                <div className={styles.tenantInfo}>
                                    <span className={styles.tenantName}>{tenant.name}</span>
                                    {tenant.unit && <span className={styles.tenantUnit}>{tenant.unit}</span>}
                                </div>
                                <span className={styles.tenantRent}>{formatCurrency(tenant.rentAmount)}</span>
                            </div>
                        ))}
                        {property.tenants.length > 3 && (
                            <div className={styles.moreTenants}>
                                +{property.tenants.length - 3} more tenants
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className={styles.cardActions}>
                <button className={styles.addTenantButton}>
                    Add Tenant
                </button>
            </div>
        </Card>
    )
}

export default PropertyCard;