import { IMonthlyIncome } from './RentPayment';

export interface IDashboardSummary {
    totalRentThisMonth: number;
    amountCollected: number;
    amountOutstanding: number;
    propertyCount: number;
    tenantCount: number;
    overdueCount: number;
    monthlyHistory: IMonthlyIncome[];
    paidRatio: number;
    unpaidRatio: number;
}
