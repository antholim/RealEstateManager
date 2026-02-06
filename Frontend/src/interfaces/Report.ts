export interface IReportLineItem {
    label: string;
    rentCollected: number;
    expenses: number;
    netAmount: number;
}

export interface IReport {
    reportType: string;
    period: string;
    totalRentCollected: number;
    totalExpenses: number;
    netCashFlow: number;
    lineItems: IReportLineItem[];
}
