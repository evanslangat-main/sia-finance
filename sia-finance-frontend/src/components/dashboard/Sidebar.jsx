import {
  LayoutDashboard,
  Receipt,
  BarChart3,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

/*
  Sidebar Navigation

  NavLink automatically gives us
  active route styling.
*/

const Sidebar = () => {
  // Shared styling for all menu links
  const baseClasses =
    "flex items-center gap-3 w-full p-3 rounded-xl transition";

  return (
    <aside className="w-64 bg-black text-white min-h-screen p-6 hidden md:block">

      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold">
          SIA Finance
        </h1>

        <p className="text-sm text-gray-400">
          Finance OS
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-3">

        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-white/20"
                : "hover:bg-white/10"
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        {/* Transactions */}
        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-white/20"
                : "hover:bg-white/10"
            }`
          }
        >
          <Receipt size={20} />
          <span>Transactions</span>
        </NavLink>

        {/* Analytics */}
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-white/20"
                : "hover:bg-white/10"
            }`
          }
        >
          <BarChart3 size={20} />
          <span>Analytics</span>
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-white/20"
                : "hover:bg-white/10"
            }`
          }
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>

      </nav>
    </aside>
  );
};

export default Sidebar;