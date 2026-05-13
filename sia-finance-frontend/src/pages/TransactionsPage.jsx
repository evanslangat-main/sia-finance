import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

/*
  Transactions Page
*/

const TransactionsPage = () => {

  // Store transactions from API
  const [transactions, setTransactions] =
    useState([]);

  /*
    Fetch transactions
  */
  const fetchTransactions = async () => {

    try {

      const response = await api.get(
        "transactions/"
      );

      setTransactions(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  /*
    Run once on page load
  */
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <DashboardLayout>

      <div className="bg-white rounded-2xl p-6 shadow-sm border">

        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">

          <div>
            <h1 className="text-2xl font-bold">
              Transactions
            </h1>

            <p className="text-gray-500 text-sm">
              Manage your financial records
            </p>
          </div>

          <button className="bg-black text-white px-4 py-2 rounded-xl">
            Add Transaction
          </button>

        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b text-left">

                <th className="pb-3">
                  ID
                </th>

                <th className="pb-3">
                  Category
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

              {transactions.map((transaction) => (

                <tr
                  key={transaction.id}
                  className="border-b"
                >

                  <td className="py-4">
                    {transaction.id}
                  </td>

                  <td>
                    {transaction.category_name

                    }
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

export default TransactionsPage;