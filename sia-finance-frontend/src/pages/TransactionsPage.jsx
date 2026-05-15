import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Plus,
  Trash2,
  Edit2,
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";
import TransactionModal from "../components/dashboard/TransactionModal";
import toast from "react-hot-toast";

/**
 * Transactions Page Component
 * Full transactions list with management capabilities
 */
const TransactionsPage = () => {
  // Store transactions from API
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch all transactions from API
   */
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await api.get("transactions/");
      setTransactions(response.data);
    } catch (error) {
      toast.error("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete a transaction
   */
  const handleDeleteTransaction = async (transactionId) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await api.delete(`transactions/${transactionId}/`);
        toast.success("Transaction deleted successfully");
        fetchTransactions();
      } catch (error) {
        toast.error("Failed to delete transaction");
      }
    }
  };

  /**
   * Open modal for editing a transaction
   */
  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  /**
   * Close modal and reset editing state
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  /**
   * Initialize page on mount
   */
  useEffect(() => {
    fetchTransactions();
  }, []);

  /**
   * Get transaction display properties
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
      <TransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTransactionCreated={fetchTransactions}
        editingTransaction={editingTransaction}
      />

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Transactions
            </h1>
            <p className="text-gray-600">
              Manage and track all your financial records
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        {loading ? (
          <div className="py-8 text-center text-gray-500">Loading...</div>
        ) : transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                    Category
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
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => {
                  const display = getTransactionDisplay(transaction.type);
                  return (
                    <tr
                      key={transaction.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-4 px-4">
                        <p className="font-medium text-gray-900">
                          {transaction.description || "No description"}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                          {transaction.category?.name || "Uncategorized"}
                        </span>
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
                            {new Date(transaction.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditTransaction(transaction)}
                            className="text-gray-400 hover:text-blue-600 transition-colors p-2 rounded hover:bg-blue-50"
                            title="Edit transaction"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteTransaction(transaction.id)
                            }
                            className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded hover:bg-red-50"
                            title="Delete transaction"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-500 text-lg mb-3">No transactions yet</p>
            <p className="text-gray-400 mb-6">
              Start by adding your first transaction
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Add Transaction</span>
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TransactionsPage;