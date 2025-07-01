import { useState } from "react";
import { Property } from "../interfaces/Property";

export function usePropertyModal() {
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [isTenantModalOpen, setIsTenantModalOpen] = useState(false);
    const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
    const [isLeaseModalOpen, setIsLeaseModalOpen] = useState(false);
  
    const openTenantModal = (property: Property) => {
      setSelectedProperty(property);
      setIsTenantModalOpen(true);
    };
    const openUnitModal = (property: Property) => {
      setSelectedProperty(property);
      setIsUnitModalOpen(true);
    };
    const openLeaseModal = (property: Property) => {
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