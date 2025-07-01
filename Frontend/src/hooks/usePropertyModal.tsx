import { useState } from "react";
import { Property } from "../interfaces/Property";

export function usePropertyModal() {
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [isTenantModalOpen, setIsTenantModalOpen] = useState(false);
    const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
    const [isLeaseModalOpen, setIsLeaseModalOpen] = useState(false);
  
    const openTenantModal = (property: Property) => {
      console.log("Opening tenant modal for property:", property);
      setSelectedProperty(property);
      setIsTenantModalOpen(true);
    };
    const openUnitModal = (property: Property) => {
      console.log("Opening unit modal for property:", property);
      setSelectedProperty(property);
      setIsUnitModalOpen(true);
    };
    const openLeaseModal = (property: Property) => {
      console.log("Opening lease modal for property:", property);
      setSelectedProperty(property);
      setIsLeaseModalOpen(true);
    };
  
    return {
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
    };
  }