import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import  { useState } from "react";

import Header from "../components/dashboard/Header";

/**
 * Dashboard Layout Component
 * Main layout wrapper for authenticated pages
 */
const DashboardLayout = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 min-h-screen">
      {/* Sidebar for desktop */}
      <Sidebar />

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Sidebar panel */}
          <div className="w-64 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900 text-white min-h-screen p-6 flex flex-col relative animate-slide-in-left">
            <Sidebar onClose={() => setMobileSidebarOpen(false)} isMobile />
          </div>
          {/* Overlay */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setMobileSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-h-screen flex flex-col">
        {/* Header */}
        <Header onOpenSidebar={() => setMobileSidebarOpen(true)} />

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
