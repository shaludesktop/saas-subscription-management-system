import { NavLink } from "react-router-dom";
import DarkModeToggle from "../common/DarkModeToggle";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg font-medium transition ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-slate-800"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-slate-900 shadow p-4 flex flex-col justify-between transition">

      <div>

        {/* Logo + Title */}
        <div className="flex items-center gap-3 mb-8">
          <img
            src="/favicon.png"
            alt="SaaS Logo"
            className="w-12 h-12 object-contain"
          />

          <div>
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              SaaS Manager
            </h2>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              User Panel
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">

          <NavLink to="/dashboard" className={linkClass}>
            📊 Dashboard
          </NavLink>

          <NavLink to="/apps" className={linkClass}>
            🧩 SaaS Apps
          </NavLink>

          <NavLink to="/subscriptions" className={linkClass}>
            📦 My Subscriptions
          </NavLink>

          <NavLink to="/payments" className={linkClass}>
            💳 Payments
          </NavLink>

          <NavLink to="/invoices" className={linkClass}>
            📄 Invoices
          </NavLink>

          <NavLink to="/profile" className={linkClass}>
            👤 Profile
          </NavLink>

        </nav>
      </div>

      {/* Dark Mode Toggle */}
      <div className="mt-6">
        <DarkModeToggle />
      </div>

    </aside>
  );
}