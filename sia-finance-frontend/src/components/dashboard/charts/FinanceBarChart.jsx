import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";


const FinanceBarChart = ({ analytics }) => {
    const data =[{
        name: "Income",
        amount: analytics.total_income,
    }, {
        name: "Expenses",
        amount: analytics.total_expenses,       
    }];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border ">
            <div className="mb-6">
                <h2 className="text-2xl font-bold">
                    Income vs Expenses
                </h2>
                <p className="text-gray-500 text-sm">
                    Overview of financial flow
                </p>
            </div>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#3b82f6" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}

export default FinanceBarChart;