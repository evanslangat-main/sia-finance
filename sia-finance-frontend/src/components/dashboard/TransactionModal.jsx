import { useEffect, useState } from "react";
import { X, DollarSign, Tag, Calendar, FileText } from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";

/**
 * Transaction Modal Component
 * Handles creating and editing transactions
 * @param {boolean} isOpen - Whether modal is open
 * @param {function} onClose - Callback when modal closes
 * @param {function} onTransactionCreated - Callback after transaction is saved
 * @param {object} editingTransaction - Optional transaction to edit
 */
const TransactionModal = ({
  isOpen,
  onClose,
  onTransactionCreated,
  editingTransaction = null,
}) => {
  // Categories dropdown state
  const [categories, setCategories] = useState([]);
  
  // Loading state
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category_id: "",
    description: "",
    date: "",
  });

  /**
   * Fetch categories from API
   */
  const fetchCategories = async () => {
    try {
      const response = await api.get("categories/");
      setCategories(response.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  /**
   * Initialize modal - fetch categories and populate form if editing
   */
  useEffect(() => {
    if (isOpen) {
      fetchCategories();

      // If editing, populate form with transaction data
      if (editingTransaction) {
        setFormData({
          title: editingTransaction.description || "",
          amount: editingTransaction.amount || "",
          type: editingTransaction.type || "expense",
          category_id: editingTransaction.category?.id || "",
          description: editingTransaction.description || "",
          date: editingTransaction.date?.split("T")[0] || "",
        });
      } else {
        // Reset form for new transaction
        resetForm();
      }
    }
  }, [isOpen, editingTransaction]);

  /**
   * Reset form to initial state
   */
  const resetForm = () => {
    setFormData({
      title: "",
      amount: "",
      type: "expense",
      category_id: "",
      description: "",
      date: "",
    });
  };

  /**
   * Handle form input changes
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handle form submission - create or update transaction
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.amount || !formData.date || !formData.category_id) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

      const submitData = {
        amount: formData.amount,
        description: formData.title || formData.description,
        type: formData.type,
        category_id: formData.category_id || null,
        date: formData.date,
      };

      if (editingTransaction) {
        // Update existing transaction
        await api.put(
          `transactions/${editingTransaction.id}/`,
          submitData
        );
        toast.success("Transaction updated successfully");
      } else {
        // Create new transaction
        await api.post("transactions/", submitData);
        toast.success("Transaction created successfully");
      }

      onTransactionCreated();
      onClose();
      resetForm();
    } catch (error) {
      toast.error(
        editingTransaction
          ? "Failed to update transaction"
          : "Failed to create transaction"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const isEditing = !!editingTransaction;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {/* Modal Card */}
      <div className="bg-white w-full max-w-lg rounded-lg p-8 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isEditing ? "Edit Transaction" : "Add Transaction"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isEditing
                ? "Update your transaction details"
                : "Create a new financial record"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title/Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="title"
                placeholder="e.g., Grocery Shopping"
                value={formData.title}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          {/* Type and Category Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Transaction Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          {/* Additional Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              name="description"
              placeholder="Add any additional notes..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              rows="3"
            />
          </div>

          {/* Button Group */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                resetForm();
              }}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
            >
              {loading
                ? "Saving..."
                : isEditing
                ? "Update Transaction"
                : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;