import { useState } from "react";
import { IProperty } from "../interfaces/Property";

export function usePropertyModal() {
    const [selectedProperty, setSelectedProperty] = useState<IProperty | null>(null);
    const [isTenantModalOpen, setIsTenantModalOpen] = useState(false);
    const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
    const [isLeaseModalOpen, setIsLeaseModalOpen] = useState(false);
  
    const openTenantModal = (property: IProperty) => {
      console.log("Opening tenant modal for property:", property);
      setSelectedProperty(property);
      setIsTenantModalOpen(true);
    };
    const openUnitModal = (property: IProperty) => {
      console.log("Opening unit modal for property:", property);
      setSelectedProperty(property);
      setIsUnitModalOpen(true);
    };
    const openLeaseModal = (property: IProperty) => {
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