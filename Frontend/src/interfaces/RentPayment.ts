export interface IRentPayment {
    id: number;
    tenantId: number;
    tenantName: string;
    propertyId: number;
    propertyName: string;
    leaseId?: number;
    amountDue: number;
    amountPaid: number;
    paymentDate?: string;
    paymentMethod?: string;
    paymentStatus: 'PAID' | 'PARTIAL' | 'UNPAID';
    dueDate: string;
    month: number;
    year: number;
    notes?: string;
}

export interface IMonthlyIncome {
    month: number;
    year: number;
    expectedIncome: number;
    actualIncome: number;
    outstanding: number;
    paidCount: number;
    partialCount: number;
    unpaidCount: number;
}
