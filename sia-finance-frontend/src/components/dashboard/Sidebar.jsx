import {
  LayoutDashboard,
  Receipt,
  BarChart3,
  Settings,
  LogOut,
  Wallet,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import toast from "react-hot-toast";

/**
 * Sidebar Navigation Component
 * Main navigation with modern design and logout functionality
 */
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Shared styling for all menu links
  const baseClasses =
    "flex items-center gap-3 w-full p-3 rounded-lg transition duration-200";

  /**
   * Handle logout
   */
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900 text-white min-h-screen p-6 hidden md:flex flex-col sticky top-0">
      {/* Logo */}
      <div className="mb-10 flex items-center gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
          <Wallet className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">SIA Finance</h1>
          <p className="text-xs text-gray-400">Finance OS</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-300 hover:bg-gray-800"
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </NavLink>

        {/* Transactions */}
        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-300 hover:bg-gray-800"
            }`
          }
        >
          <Receipt size={20} />
          <span className="font-medium">Transactions</span>
        </NavLink>

        {/* Analytics */}
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-300 hover:bg-gray-800"
            }`
          }
        >
          <BarChart3 size={20} />
          <span className="font-medium">Analytics</span>
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-300 hover:bg-gray-800"
            }`
          }
        >
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </NavLink>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-300 hover:bg-red-600/20 transition duration-200 border border-red-600/30 hover:border-red-600/60"
      >
        <LogOut size={20} />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;