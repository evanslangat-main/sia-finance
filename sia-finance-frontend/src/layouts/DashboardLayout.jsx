import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";

/**
 * Dashboard Layout Component
 * Main layout wrapper for authenticated pages
 */
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-4 text-center text-sm text-gray-600">
          <p>&copy; 2026 SIA Finance. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;