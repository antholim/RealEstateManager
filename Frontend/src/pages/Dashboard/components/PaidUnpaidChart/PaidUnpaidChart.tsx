import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import styles from './PaidUnpaidChart.module.css';

interface PaidUnpaidChartProps {
    paidRatio: number;
    unpaidRatio: number;
}

const COLORS = ['#16a34a', '#dc2626'];

export default function PaidUnpaidChart({ paidRatio, unpaidRatio }: PaidUnpaidChartProps) {
    const data = [
        { name: 'Paid', value: Math.round(paidRatio * 100) },
        { name: 'Unpaid', value: Math.round(unpaidRatio * 100) },
    ];

    if (paidRatio === 0 && unpaidRatio === 0) {
        return <div className={styles.empty}>No payment data yet</div>;
    }

    return (
        <div className={styles.container}>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value}%`} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
