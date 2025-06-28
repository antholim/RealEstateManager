export interface Property {
    id: string;
    propertyName: string;
    address: string;
    purchasePrice: number;
    propertyType: string;
    totalUnits: number;
    occupiedUnits: number;
    monthlyRevenue: number;
    tenants: Tenant[];
}

export interface Tenant {
    id: string;
    name: string;
    email: string;
    phone: string;
    leaseStart: string;
    leaseEnd: string;
    rentAmount: number;
    unit?: string;
}