import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./PropertyPage.module.css"
import { useEffect, useState } from "react"
import AddPropertyModal from "./components/AddPropertyModal";
import PropertyCard from "./components/PropertyCard/PropertyCard";
import { fetchGet } from "../../services/FetchService";

interface Property {
    id: number
    name: string
    address: string
    units: number
    occupancyRate: number
    tenants: []
}

const propertiesInitial: Property[] = [
    { id: 1, name: "Appartment Hochelaga", address: "920 Rue Bossuet", units: 8, occupancyRate: 100, tenants: [] },
]

export default function PropertyPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [properties, setProperties] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (value: any) => {
        console.log('Submitted:', value);
        // Add the new property to the list
        const newProperty = {
            ...value,
            id: Date.now() // Simple ID generation - use proper UUID in production
        };
        setProperties(prev => [...prev, newProperty]);
        setIsModalOpen(false);
    };

    const handleDelete = (id: number) => {
        setProperties(properties.filter((property) => property.id !== id))
    }

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                const response = await fetchGet("/api/v1/property", {
                    credentials: "include"
                });
                
                console.log("Fetched response:", response);
                const propertiesList = response?.payload
                // Update properties state with fetched data
                if (propertiesList && Array.isArray(propertiesList)) {
                    setProperties(propertiesList);
                } else {
                    // Fallback to initial data if API returns unexpected format
                    setProperties(propertiesInitial);
                }
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

    if (isLoading) {
        return (
            <div className={styles.container}>
                <Sidebar />
                <header>Properties</header>
                <main className={styles.main}>
                    <div>Loading properties...</div>
                </main>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Sidebar />
            <header>
                Properties
                <button 
                    type="button" 
                    className={styles.submitButton} 
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Property
                </button>
            </header>
            
            <AddPropertyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                title="Add New Property"
                submitButtonText="Create Property"
            />
            
            <main className={styles.main}>
                {error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )}
                
                {properties.length === 0 ? (
                    <div>No properties found</div>
                ) : (
                    properties.map(property => (
                        <PropertyCard 
                            key={property.id}
                            handleDelete={handleDelete} 
                            property={property} 
                        />
                    ))
                )}
            </main>
        </div>
    )
}