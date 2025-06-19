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
    tenants:[]
  }
const propertiesInitial:Property[] = [
  { id: 1, name: "Appartment Hochelaga", address: "920 Rue Bossuet", units: 8, occupancyRate: 100, tenants:[] },
]
export default function PropertyPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSubmit = (value) => {
        console.log('Submitted:', value);
        setIsModalOpen(false);
    };
    const [properties, setProperties] = useState<Property[]>(propertiesInitial)
  
    const handleDelete = (id: number) => {
      setProperties(properties.filter((property) => property.id !== id))
    }
    useEffect(()=> {
        let response;
        const fetch = async () => {
            response = await fetchGet("/api/v1/property");
        }
        fetch()
        console.log(response)
    })
    return (
        <div className={styles.container}>
            <Sidebar />
            <header>Properties
                <button type="submit" className={styles.submitButton} onClick={() => setIsModalOpen(true)}>
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
                {/* <AddProperty /> */}
                <PropertyCard handleDelete={handleDelete} property={propertiesInitial[0]}/>
            </main>
        </div>
    )
}

