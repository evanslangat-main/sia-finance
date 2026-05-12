import {
  LayoutDashboard,
  Receipt,
  BarChart3,
  Settings,
} from "lucide-react";

/*
  Sidebar Component

  This handles the left navigation panel
  of the dashboard.
*/

const Sidebar = () => {
  return (
    <aside className="w-64 bg-black text-white min-h-screen p-6">

      {/* Logo / App Name */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold">
          SIA Finance
        </h1>

        <p className="text-sm text-gray-400">
          Finance OS
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-3">

        <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-white/10 hover:bg-white/20 transition">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/10 transition">
          <Receipt size={20} />
          <span>Transactions</span>
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/10 transition">
          <BarChart3 size={20} />
          <span>Analytics</span>
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/10 transition">
          <Settings size={20} />
          <span>Settings</span>
        </button>

      </nav>
    </aside>
  );
};

export default Sidebar;