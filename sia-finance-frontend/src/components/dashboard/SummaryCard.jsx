import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

/**
 * Reusable Analytics Card Component
 * Displays financial metrics with icons and styling
 * @param {string} title - Card title
 * @param {number} amount - Financial amount to display
 * @param {string} type - Card type: 'balance', 'income', 'expenses'
 * @param {number} trend - Optional trend percentage
 */
const SummaryCard = ({
  title,
  amount,
  type = "balance",
  trend = null,
}) => {
  // Determine card styling based on type
  const getCardStyle = () => {
    switch (type) {
      case "income":
        return {
          bg: "bg-gradient-to-br from-green-50 to-emerald-50",
          border: "border-green-200",
          icon: "text-green-600",
          accent: "bg-green-100",
        };
      case "expenses":
        return {
          bg: "bg-gradient-to-br from-red-50 to-rose-50",
          border: "border-red-200",
          icon: "text-red-600",
          accent: "bg-red-100",
        };
      default:
        return {
          bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
          border: "border-blue-200",
          icon: "text-blue-600",
          accent: "bg-blue-100",
        };
    }
  };

  const style = getCardStyle();

  // Get appropriate icon
  const getIcon = () => {
    switch (type) {
      case "income":
        return <TrendingUp className="w-5 h-5" />;
      case "expenses":
        return <TrendingDown className="w-5 h-5" />;
      default:
        return <Wallet className="w-5 h-5" />;
    }
  };

  return (
    <div
      className={`${style.bg} rounded-lg p-6 shadow-sm border ${style.border} transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer`}
    >
      {/* Header with icon and title */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
        </div>
        <div className={`${style.accent} rounded-lg p-2`}>
          <div className={style.icon}>{getIcon()}</div>
        </div>
      </div>

      {/* Amount */}
      <div className="flex items-baseline justify-between">
        <h3 className="text-3xl font-bold text-gray-900">
          ${Number(amount || 0).toLocaleString()}
        </h3>
        {trend && (
          <span
            className={`text-xs font-semibold ${
              trend >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;