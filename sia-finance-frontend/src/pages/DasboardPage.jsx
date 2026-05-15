import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownLeft, Calendar } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import SummaryCard from "../components/dashboard/SummaryCard";
import ExpensePieChart from "../components/dashboard/charts/ExpensePieChart";
import FinanceBarChart from "../components/dashboard/charts/FinanceBarChart";
import toast from "react-hot-toast";
import api from "../services/api";

/**
 * Dashboard Page Component
 * Main dashboard view displaying analytics, charts, and recent transactions
 */
const DashboardPage = () => {
  // Dashboard analytics state
  const [analytics, setAnalytics] = useState({
    total_income: 0,
    total_expenses: 0,
    total_balance: 0,
    net_balance: 0,
    recent_transactions: [],
  });

  // Category analytics for pie chart
  const [categoryAnalytics, setCategoryAnalytics] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  /**
   * Fetch dashboard analytics from API
   */
  const fetchAnalytics = async () => {
    try {
      const response = await api.get("dashboard/analytics/");
      setAnalytics(response.data);
      console.log(response.data);
    } catch (error) {
      toast.error("Failed to fetch analytics");
    }
  };

  /**
   * Fetch category-based analytics for charts
   */
  const fetchCategoryAnalytics = async () => {
    try {
      const response = await api.get("dashboard/category-analytics/");
      setCategoryAnalytics(response.data);
    } catch (error) {
      toast.error("Failed to fetch category analytics");
    }
  };

  /**
   * Initialize dashboard on component mount
   */
  useEffect(() => {
    const initDashboard = async () => {
      setLoading(true);
      await Promise.all([fetchAnalytics(), fetchCategoryAnalytics()]);
      setLoading(false);
    };
    initDashboard();
  }, []);

  /**
   * Format transaction type to display with appropriate styling
   */
  const getTransactionDisplay = (type) => {
    const isIncome = type.toLowerCase() === "income";
    return {
      icon: isIncome ? (
        <ArrowDownLeft className="w-4 h-4" />
      ) : (
        <ArrowUpRight className="w-4 h-4" />
      ),
      color: isIncome ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50",
      label: isIncome ? "Income" : "Expense",
    };
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your financial overview.</p>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          title="Total Balance"
          amount={analytics.net_balance}
          type="balance"
        />
        <SummaryCard
          title="Total Income"
          amount={analytics.total_income}
          type="income"
        />
        <SummaryCard
          title="Total Expenses"
          amount={analytics.total_expenses}
          type="expenses"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <FinanceBarChart analytics={analytics} />
        <ExpensePieChart data={categoryAnalytics} />
      </div>

      {/* Recent Transactions Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Recent Transactions
          </h2>
          <p className="text-sm text-gray-500">Latest financial activity</p>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                  Description
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                  Amount
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                  Type
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {analytics.recent_transactions &&
              analytics.recent_transactions.length > 0 ? (
                analytics.recent_transactions.map((transaction) => {
                  const display = getTransactionDisplay(transaction.type);
                  return (
                    <tr
                      key={transaction.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-4 px-4">
                        <p className="font-medium text-gray-900">
                          {transaction.description}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-gray-900">
                          ${Number(transaction.amount).toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${display.color}`}
                        >
                          {display.icon}
                          <span>{display.label}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            {new Date(transaction.date).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;

