import React from 'react'
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 min-h-screen">
          {/* Header */}
          <Header />
            {/* Content */}
            <main className="p-6">
                {children}
            </main>
        </div>
    </div>
  )
}

export default DashboardLayout