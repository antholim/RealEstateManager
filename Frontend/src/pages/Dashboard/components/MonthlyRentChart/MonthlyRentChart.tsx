import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { IMonthlyIncome } from '../../../../interfaces/RentPayment';
import styles from './MonthlyRentChart.module.css';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface MonthlyRentChartProps {
    data: IMonthlyIncome[];
}

export default function MonthlyRentChart({ data }: MonthlyRentChartProps) {
    const chartData = data.map(d => ({
        month: monthNames[(d.month - 1) % 12],
        Expected: d.expectedIncome,
        Collected: d.actualIncome,
    }));

    return (
        <div className={styles.container}>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="Expected" fill="#93c5fd" />
                    <Bar dataKey="Collected" fill="#2563eb" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
