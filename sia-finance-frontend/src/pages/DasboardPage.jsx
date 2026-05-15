import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import SummaryCard from "../components/dashboard/SummaryCard";
import toast from "react-hot-toast";

import api from "../services/api";

/*
  Dashboard Page
*/

const DashboardPage = () => {

  // Dashboard analytics
  const [analytics, setAnalytics] =
    useState({

      total_income: 0,
      total_expenses: 0,
      total_balance: 0,

      recent_transactions: [],
    });

  /*
    Fetch analytics
  */
  const fetchAnalytics = async () => {

    try {
        
      const response = await api.get(
        "dashboard/analytics/"
      );

      setAnalytics(response.data);
      console.log(response.data)

    } catch (error) {

      toast.error("Failed to fetch analytics");

    }
  };

  /*
    Run on page load
  */
  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (

    <DashboardLayout>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">

        <SummaryCard
          title="Total Balance"
          amount={analytics.net_balance}
        />

        <SummaryCard
          title="Income"
          amount={analytics.total_income}
        />

        <SummaryCard
          title="Expenses"
          amount={analytics.total_expenses}
        />

      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">

        <div className="mb-6">

          <h2 className="text-2xl font-bold">
            Recent Transactions
          </h2>

          <p className="text-gray-500 text-sm">
            Latest financial activity
          </p>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b text-left">

                <th className="pb-3">
                  Title
                </th>

                

                <th className="pb-3">
                  Amount
                </th>

                <th className="pb-3">
                  Type
                </th>

                <th className="pb-3">
                  Date
                </th>

              </tr>
            </thead>

            <tbody>

              {analytics.recent_transactions.map(
                (transaction) => (

                <tr
                  key={transaction.id}
                  className="border-b"
                >

                  <td className="py-4">
                    {transaction.description}
                  </td>

                  

                  <td>
                    ${transaction.amount}
                  </td>

                  <td>
                    {transaction.type}
                  </td>

                  <td>
                    {transaction.date}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default DashboardPage;

