import React, { useState, useEffect } from "react";

// Mock Link component for demo purposes
const Link = ({ to, children, className, ...props }) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdminLoggedIn") === "true"
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Website Name */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              TheLibraryBlogs
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
              <Link
                to="/privacy"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
              >
                Privacy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </Link>

              {isAdmin && (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
              <Link
                to="/about"
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-blue-600 hover:bg-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-blue-600 hover:bg-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Contact
              </Link>
              <Link
                to="/privacy"
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-blue-600 hover:bg-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Privacy
              </Link>

              {isAdmin && (
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="w-full text-left bg-red-500 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-red-600 transition-colors duration-200 mt-2"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}