export interface IProperty {
    id: string;
    purchasePrice: number;
    propertyType: string;
    address: string;
    propertyName: string;
    totalUnits: number;
    monthlyRevenue: number;
    occupiedUnits: number;
    tenants: Tenant[];
    units: IUnit[]
    notes?: string;
}

export interface IUnit {
    id: number;
    propertyId: number;
    unitNumber: string;
    unitType: string;
}
export interface Tenant {
    id: string;
    firstName?: string;
    lastName?: string;
    name: string;
    email: string;
    phone: string;
    leaseStart: string;
    leaseEnd: string;
    rentAmount: number;
    unit?: string;
    propertyId?: number;
    propertyName?: string;
}