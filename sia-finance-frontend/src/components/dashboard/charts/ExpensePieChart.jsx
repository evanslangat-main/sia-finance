import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from "recharts";

/*
  Expense Category Pie Chart
*/

const ExpensePieChart = ({
  data,
}) => {

  // Random chart colors
  const COLORS = [
    "#111827",
    "#374151",
    "#6B7280",
    "#9CA3AF",
    "#D1D5DB",
  ];

  return (

    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-400">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          Expense Categories
        </h2>

        <p className="text-gray-500 text-sm">
          Spending distribution
        </p>

      </div>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="total"
              nameKey="category__name"
              outerRadius={120}
              label
            >

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default ExpensePieChart;