import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import DarkModeToggle from "../common/DarkModeToggle";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-slate-900 shadow px-6 py-4 flex justify-between items-center transition border-b border-gray-200 dark:border-slate-800">

      {/* Logo + Title */}
      <Link
        to="/"
        className="flex items-center gap-3"
      >
        <img
          src="/favicon.png"
          alt="SaaS Logo"
          className="w-10 h-10 object-contain"
        />

        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          SaaS Manager
        </h1>
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-4">

        <Link
          to="/apps"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          Apps
        </Link>

        {user ? (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/payments"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Payments
            </Link>

            <Link
              to="/invoices"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Invoices
            </Link>

            {/* Admin Button */}
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 transition"
              >
                Admin Panel
              </Link>
            )}

            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* Profile */}
            <div className="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-slate-800 px-3 py-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {user?.name}
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <DarkModeToggle />

            <Link
              to="/login"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}