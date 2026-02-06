import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./PropertyPage.module.css"
import { useEffect, useState } from "react"
import AddPropertyModal from "./components/AddPropertyModal/AddPropertyModal";
import PropertyCard from "./components/PropertyCard/PropertyCard";
import { fetchGet, fetchDelete } from "../../services/FetchService";
import { Building, TrendingUp, Users, DollarSign } from "lucide-react";
import { IProperty } from "../../interfaces/Property";
import ViewPropertyModal from "./components/ViewPropertyModal/ViewPropertyModal";
import AddTenantModal from "./components/AddTenantModal/AddTenantModal";
import AddUnitModal from "./components/AddUnitModal/AddUnitModal";
import AddLeaseModal from "./components/AddLeaseModal/AddLeaseModal";
import { usePropertyModal } from "../../hooks/usePropertyModal";

export default function PropertyPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        selectedProperty,
        isTenantModalOpen,
        isUnitModalOpen,
        isLeaseModalOpen,
        openTenantModal,
        openUnitModal,
        openLeaseModal,
        setIsTenantModalOpen,
        setIsUnitModalOpen,
        setIsLeaseModalOpen,
    } = usePropertyModal();
    const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
    const [editProperty, setEditProperty] = useState<IProperty | null>(null);

    const [properties, setProperties] = useState<IProperty[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProperties = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetchGet<any>("/api/v1/property-summary", {
                credentials: "include"
            });
            const propertiesList = response?.payload || response;
            setProperties(propertiesList);
        } catch (error) {
            console.error("Fetch failed:", error);
            setError("Failed to load properties");
            setProperties([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (value: any) => {
        fetchProperties();
        setIsModalOpen(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this property?')) return;
        try {
            await fetchDelete(`/api/v1/property/${id}`);
            fetchProperties();
        } catch (error) {
            console.error('Failed to delete property:', error);
        }
    };

    const handleEditProperty = (property: IProperty) => {
        setEditProperty(property);
        setIsPropertyModalOpen(true);
    };

    useEffect(() => {
        fetchProperties();
    }, []);

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
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <Building className={styles.headerIcon} />
                        <div>
                            <h1 className={styles.headerTitle}>Property Manager Dashboard</h1>
                            <p className={styles.headerSubtitle}>Manage your properties and tenants</p>
                        </div>
                    </div>
                </div>

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

                <div className={styles.propertiesSection}>
                    <div className={styles.propertiesHeader}>
                        <h2 className={styles.propertiesTitle}>Your Properties</h2>
                        <div>
                            <button
                                type="button"
                                className={styles.addPropertyButton}
                                onClick={() => setIsModalOpen(true)}
                            >
                                Add Property
                            </button>
                            <button
                                type="button"
                                className={styles.addPropertyButton}
                                onClick={() => setIsTenantModalOpen(true)}
                            >
                                Add Tenant
                            </button>
                        </div>
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
                        onClose={() => { setIsPropertyModalOpen(false); setEditProperty(null); }}
                        onSubmit={() => fetchProperties()}
                        title="Edit Property"
                        submitButtonText="Update Property"
                        property={editProperty}
                    />
                    <AddUnitModal
                        isOpen={isUnitModalOpen}
                        property={selectedProperty}
                        onClose={() => setIsUnitModalOpen(false)}
                        onSubmit={handleSubmit}
                        title="Add Unit"
                        submitButtonText="Add Unit" />
                    <AddLeaseModal
                        isOpen={isLeaseModalOpen}
                        property={selectedProperty}
                        onClose={() => setIsLeaseModalOpen(false)}
                        onSubmit={handleSubmit}
                        title="Add Lease"
                        submitButtonText="Add Lease" />
                    <AddTenantModal
                        isOpen={isTenantModalOpen}
                        onClose={() => setIsTenantModalOpen(false)}
                        onSubmit={handleSubmit}
                        title="Add Tenant"
                        submitButtonText="Add Tenant"
                        properties={properties}
                        selectedPropertyId={selectedProperty?.id} />

                    <div className={styles.propertiesGrid}>
                        {error && (
                            <div className={styles.error}>{error}</div>
                        )}
                        {properties.length === 0 ? (
                            <div className={styles.noProperties}>No properties found</div>
                        ) : (
                            properties.map(property => (
                                <PropertyCard
                                    selectedProperty={selectedProperty}
                                    key={property.id}
                                    property={property}
                                    onDelete={handleDelete}
                                    onEdit={handleEditProperty}
                                    setIsPropertyModalOpen={setIsPropertyModalOpen}
                                    openUnitModal={openUnitModal}
                                    openLeaseModal={openLeaseModal}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
