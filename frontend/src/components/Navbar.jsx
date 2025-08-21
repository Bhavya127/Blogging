import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdminLoggedIn") === "true"
  );

  useEffect(() => {
    // Update state on login
    const handleLogin = () => setIsAdmin(true);

    // Update state on logout
    const handleLogoutEvent = () => setIsAdmin(false);

    window.addEventListener("adminLogin", handleLogin);
    window.addEventListener("adminLogout", handleLogoutEvent);

    return () => {
      window.removeEventListener("adminLogin", handleLogin);
      window.removeEventListener("adminLogout", handleLogoutEvent);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");

    // dispatch logout event
    window.dispatchEvent(new Event("adminLogout"));

    window.location.href = "/login"; // redirect
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Website Name */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-gray-300 transition-colors duration-200"
        >
          BoundlessMinds
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 text-lg font-medium">
          <Link
            to="/about"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Contact
          </Link>
          <Link
            to="/privacy"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Privacy
          </Link>

          {isAdmin && (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
