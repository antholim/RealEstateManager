import Sidebar from "../../components/Sidebar/Sidebar";
import AddProperty from "./components/AddProperty"
import styles from "./PropertyPage.module.css"
import { useState } from "react"
import Modal from "../../components/Modal/Modal";

export default function PropertyPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSubmit = (value) => {
        console.log('Submitted:', value);
        setIsModalOpen(false);
    };
    return (
        <div className={styles.container}>
            <Sidebar />
            <header>Properties
                <button type="submit" className={styles.submitButton} onClick={() => setIsModalOpen(true)}>
                    Add Property
                </button>
            </header>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                title="Add New Item"
                inputLabel="Item Name"
                inputPlaceholder="Enter item name..."
                submitButtonText="Add Item"
            />
            <main className={styles.main}>
                <AddProperty />
            </main>
        </div>
    )
}

