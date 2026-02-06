export interface IExpense {
    id: number;
    propertyId: number;
    propertyName: string;
    category: 'MAINTENANCE' | 'TAXES' | 'INSURANCE' | 'UTILITIES' | 'OTHER';
    amount: number;
    date: string;
    description?: string;
}
