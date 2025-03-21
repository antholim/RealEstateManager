import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import styles from "./revenue-chart.module.css"


const generateCurrentMonthsData = () => {
  const months = [];
  const currentDate = new Date();
  
  // Get the current month and the 5 months before it (total of 6 months)
  for (let i = 12; i >= 0; i--) {
    const date = new Date();
    date.setMonth(currentDate.getMonth() - i);
    
    const monthName = date.toLocaleString('default', { month: 'short' });
    months.push({
      month: monthName,
      revenue: Math.floor(Math.random() * 7000) + 3000 // Random revenue between 3000 and 10000
    });
  }
  
  return months;
};
export default function RevenueChart() {
  const data = generateCurrentMonthsData()
  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

