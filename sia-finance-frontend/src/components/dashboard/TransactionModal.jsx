import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

/*
  Transaction Modal Component

  Handles createing transactions and fetching categories for dropdown
*/

const TransactionModal =({ isOpen, onClose, onTransactionCreated }) => {
     

    //for categories for dropdown
    const [categories, setCategories] = useState([]);

    // frm state
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        type: "expense",
        category_id: "",
        description : "",    
        date: "",
    });

    const fetchCategories = async () => {
        try {
            const response = await api.get("categories/");
            setCategories(response.data);
        } catch (error) {
            toast.error("Failed to fetch categories");
        }
    };

    // Run when modal opens

    useEffect(() => {
        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    // handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("transactions/", formData);
            onTransactionCreated();
            onClose();
            toast.success("Transaction created successfully");

            //reset form
            setFormData({
                title: "",
                amount: "",
                type: "expense",    
                category_id: "",
                description : "",    
                date: "",
            });
        } catch (error) {
            toast.error("Failed to create transaction");
        }
    };

    if (!isOpen) return null;

    return (
       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      {/* Modal Card */}
      <div className="bg-white w-full max-w-lg rounded-2xl p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold">
            Add Transaction
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500"
          >
            ✕
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Transaction Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          {/* Amount */}
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          {/* Transaction Type */}
          <select
            name="transaction_type"
            value={formData.transaction_type}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          >

            <option value="expense">
              Expense
            </option>

            <option value="income">
              Income
            </option>

          </select>

          {/* Category Dropdown */}
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
            required
          >

            <option value="">
              Select Category
            </option>

            {categories.map((category) => (

              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>

            ))}

          </select>

          {/* Date */}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
            rows="3"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl"
          >
            Save Transaction
          </button>

        </form>

      </div>

    </div>
  );
};

export default TransactionModal;