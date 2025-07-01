import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./PropertyPage.module.css"
import { useEffect, useState } from "react"
import AddPropertyModal from "./components/AddPropertyModal/AddPropertyModal";
import PropertyCard from "./components/PropertyCard/PropertyCard";
import { fetchGet } from "../../services/FetchService";
import { Building, TrendingUp, Users, DollarSign } from "lucide-react";
import { Property, Tenant } from "../../interfaces/Property";
import ViewPropertyModal from "./components/ViewPropertyModal/ViewPropertyModal";
import AddTenantModal from "./components/AddTenant/AddTenantModal";

const propertiesInitial: Property[] = [
    {
        id: '1',
        propertyName: 'Sunset Apartments',
        address: '123 Main St, Downtown',
        propertyType: 'apartment',
        totalUnits: 12,
        occupiedUnits: 10,
        monthlyRevenue: 18000,
        purchasePrice: 600000,
        tenants: [
            {
                id: '1',
                name: 'John Smith',
                email: 'john.smith@email.com',
                phone: '(555) 123-4567',
                leaseStart: '2024-01-01',
                leaseEnd: '2024-12-31',
                rentAmount: 1800,
                unit: '2A'
            },
            {
                id: '2',
                name: 'Sarah Johnson',
                email: 'sarah.j@email.com',
                phone: '(555) 987-6543',
                leaseStart: '2024-03-01',
                leaseEnd: '2025-02-28',
                rentAmount: 1650,
                unit: '1B'
            }
        ]
    },
    {
        id: '2',
        propertyName: 'Oak Street House',
        address: '456 Oak Street, Suburbs',
        propertyType: 'house',
        totalUnits: 1,
        occupiedUnits: 1,
        monthlyRevenue: 2400,
        purchasePrice: 600000,
        tenants: [
            {
                id: '3',
                name: 'Michael Brown',
                email: 'mike.brown@email.com',
                phone: '(555) 456-7890',
                leaseStart: '2024-02-15',
                leaseEnd: '2025-02-14',
                rentAmount: 2400,
            }
        ]
    },
    {
        id: '3',
        propertyName: 'Commerce Plaza',
        address: '789 Business Ave, Commercial District',
        propertyType: 'commercial',
        totalUnits: 8,
        occupiedUnits: 6,
        monthlyRevenue: 24000,
        purchasePrice: 600000,
        tenants: [
            {
                id: '4',
                name: 'Tech Solutions LLC',
                email: 'contact@techsolutions.com',
                phone: '(555) 111-2222',
                leaseStart: '2024-01-01',
                leaseEnd: '2026-12-31',
                rentAmount: 4000,
                unit: 'Suite 201'
            },
            {
                id: '5',
                name: 'Green Coffee Co.',
                email: 'hello@greencoffee.com',
                phone: '(555) 333-4444',
                leaseStart: '2024-06-01',
                leaseEnd: '2025-05-31',
                rentAmount: 3200,
                unit: 'Ground Floor'
            }
        ]
    }
];

export default function PropertyPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectProperty,setSelectProperty] = useState("");
    const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
    const [properties, setProperties] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (value: any) => {
        console.log('Submitted:', value);
        // Add the new property to the list
        const newProperty = {
            ...value,
            id: Date.now().toString(), // Simple ID generation - use proper UUID in production
            totalUnits: parseInt(value.units) || 0,
            occupiedUnits: 0,
            monthlyRevenue: 0,
            tenants: []
        };
        setProperties(prev => [...prev, newProperty]);
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        setProperties(properties.filter((property) => property.id !== id))
    }

    const handleAddTenant = (propertyId: string, newTenant: Tenant) => {
        setProperties(prevProperties =>
            prevProperties.map(property => {
                if (property.id === propertyId) {
                    const updatedTenants = [...property.tenants, newTenant];
                    const newOccupiedUnits = Math.min(updatedTenants.length, property.totalUnits);
                    const newMonthlyRevenue = updatedTenants.reduce((sum, tenant) => sum + tenant.rentAmount, 0);
                    
                    return {
                        ...property,
                        tenants: updatedTenants,
                        occupiedUnits: newOccupiedUnits,
                        monthlyRevenue: newMonthlyRevenue
                    };
                }
                return property;
            })
        );
    };

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                const response = await fetchGet("/api/v1/property", {
                    credentials: "include"
                });
                
                console.log("Fetched response:", response);
                const propertiesList = response?.payload || response;
                // Update properties state with fetched data
                if (propertiesList && Array.isArray(propertiesList)) {
                    setProperties(propertiesList);
                } else {
                    // Fallback to initial data if API returns unexpected format
                    setProperties(propertiesInitial);
                }
                setProperties(propertiesInitial);
            } catch (error) {
                console.error("Fetch failed:", error);
                setError("Failed to load properties");
                // Fallback to initial data on error
                setProperties(propertiesInitial);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchProperties();
    }, []);

    // Calculate dashboard statistics
    const totalProperties = properties.length;
    const totalUnits = properties.reduce((sum, property) => sum + property.totalUnits, 0);
    const occupiedUnits = properties.reduce((sum, property) => sum + property.occupiedUnits, 0);
    const totalRevenue = properties.reduce((sum, property) => sum + property.monthlyRevenue, 0);
    const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    if (isLoading) {
        return (
            <div className={styles.container}>
                <Sidebar />
                <div className={styles.content}>
                    <div className={styles.header}>
                        <div className={styles.headerContent}>
                            <Building className={styles.headerIcon} />
                            <div>
                                <h1 className={styles.headerTitle}>Property Manager Dashboard</h1>
                                <p className={styles.headerSubtitle}>Manage your properties and tenants</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.main}>
                        <div>Loading properties...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.content}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <Building className={styles.headerIcon} />
                        <div>
                            <h1 className={styles.headerTitle}>Property Manager Dashboard</h1>
                            <p className={styles.headerSubtitle}>Manage your properties and tenants</p>
                        </div>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className={styles.statsContainer}>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statContent}>
                                <div className={styles.statIcon}>
                                    <Building className={styles.icon} />
                                </div>
                                <div className={styles.statInfo}>
                                    <p className={styles.statLabel}>Total Properties</p>
                                    <p className={styles.statValue}>{totalProperties}</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statContent}>
                                <div className={styles.statIcon}>
                                    <Users className={styles.icon} />
                                </div>
                                <div className={styles.statInfo}>
                                    <p className={styles.statLabel}>Occupancy Rate</p>
                                    <p className={styles.statValue}>{occupancyRate}%</p>
                                    <p className={styles.statSubtext}>{occupiedUnits}/{totalUnits} units</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statContent}>
                                <div className={styles.statIcon}>
                                    <DollarSign className={styles.icon} />
                                </div>
                                <div className={styles.statInfo}>
                                    <p className={styles.statLabel}>Monthly Revenue</p>
                                    <p className={styles.statValue}>{formatCurrency(totalRevenue)}</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statContent}>
                                <div className={styles.statIcon}>
                                    <TrendingUp className={styles.icon} />
                                </div>
                                <div className={styles.statInfo}>
                                    <p className={styles.statLabel}>Avg. Revenue/Unit</p>
                                    <p className={styles.statValue}>
                                        {formatCurrency(totalUnits > 0 ? totalRevenue / totalUnits : 0)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Properties Grid */}
                <div className={styles.propertiesSection}>
                    <div className={styles.propertiesHeader}>
                        <h2 className={styles.propertiesTitle}>Your Properties</h2>
                        <button 
                            type="button" 
                            className={styles.addPropertyButton} 
                            onClick={() => setIsModalOpen(true)}
                        >
                            Add Property
                        </button>
                    </div>
                    
                    <AddPropertyModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleSubmit}
                        title="Add New Property"
                        submitButtonText="Create Property"
                    />

                    <ViewPropertyModal
                        isOpen={isPropertyModalOpen}
                        onClose={() => setIsPropertyModalOpen(false)}
                        onSubmit={handleSubmit}
                        title="Property Info"
                        submitButtonText="Create Property"
                    />
                    <AddTenantModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleSubmit}
                        title="Add Tenant"
                        submitButtonText="Create Property"/>
                    
                    <div className={styles.propertiesGrid}>
                        {error && (
                            <div className={styles.error}>
                                {error}
                            </div>
                        )}
                        
                        {properties.length === 0 ? (
                            <div className={styles.noProperties}>No properties found</div>
                        ) : (
                            properties.map(property => (
                                <PropertyCard 
                                    key={property.id}
                                    property={property}
                                    onDelete={handleDelete}
                                    onAddTenant={handleAddTenant}
                                    setSelectProperty={setSelectProperty}
                                    setIsPropertyModalOpen={setIsPropertyModalOpen}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}