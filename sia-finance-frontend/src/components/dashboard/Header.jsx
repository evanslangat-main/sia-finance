import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, Menu } from "lucide-react";
import { logout } from "../../features/auth/authSlice";
import toast from "react-hot-toast";

/**
 * Header Component
 * Main header with user menu, logout, and mobile sidebar toggle
 * @param {function} onOpenSidebar - callback to open mobile sidebar
 */
const Header = ({ onOpenSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Get current user from localStorage (username is typically stored)
  const user = localStorage.getItem("username") || "User";
  const userInitial = user.charAt(0).toUpperCase();

  /**
   * Handle logout
   */
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  /**
   * Close menu when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Hamburger for mobile */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onOpenSidebar}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-500 text-sm">Welcome back 👋</p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 relative" ref={menuRef}>
        {/* Profile Avatar Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold hover:shadow-lg transition-shadow"
          title="User menu"
        >
          {userInitial}
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 top-full">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{user}</p>
              <p className="text-xs text-gray-500 mt-1">Signed in</p>
            </div>
            {/* Menu Items */}
            <button
              onClick={() => {
                navigate("/settings");
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </button>
            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 flex items-center gap-3 text-red-600 hover:bg-red-50 transition border-t border-gray-100"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
