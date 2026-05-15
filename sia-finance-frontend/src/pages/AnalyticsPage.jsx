import { BarChart3, TrendingUp, PieChart } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";

/**
 * Analytics Page Component
 * Financial insights and analytics dashboard
 */
const AnalyticsPage = () => {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">Financial insights and detailed reports</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Transactions */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 font-semibold">Total Transactions</h3>
            <div className="bg-blue-100 p-3 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">—</p>
          <p className="text-sm text-gray-500 mt-2">Loading analytics...</p>
        </div>

        {/* Growth Rate */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 font-semibold">Growth Rate</h3>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">—</p>
          <p className="text-sm text-gray-500 mt-2">Month over month</p>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 font-semibold">Categories</h3>
            <div className="bg-purple-100 p-3 rounded-lg">
              <PieChart className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">—</p>
          <p className="text-sm text-gray-500 mt-2">Expense breakdown</p>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-12 border border-blue-200 text-center">
        <div className="inline-block bg-blue-100 p-4 rounded-full mb-4">
          <BarChart3 className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Advanced Analytics Coming Soon</h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          We're working on powerful analytics features to help you understand your spending patterns, income trends, and financial health better.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;