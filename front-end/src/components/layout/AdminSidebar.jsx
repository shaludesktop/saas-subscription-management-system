import { NavLink } from "react-router-dom";
import DarkModeToggle from "../common/DarkModeToggle";

export default function AdminSidebar() {
  const linkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg font-medium transition ${
      isActive
        ? "bg-purple-600 text-white shadow"
        : "text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-slate-800"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-slate-900 shadow p-4 flex flex-col justify-between transition">
      <div>
        <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-6">
          Admin Panel
        </h2>

        <nav className="space-y-2">
          <NavLink to="/admin" end className={linkClass}>
            📊 Dashboard
          </NavLink>

          <NavLink to="/admin/users" className={linkClass}>
            👥 Users
          </NavLink>

          <NavLink to="/admin/saas-apps" className={linkClass}>
            🧩 SaaS Apps
          </NavLink>

          <NavLink to="/admin/plans" className={linkClass}>
            📋 Plans
          </NavLink>

          <NavLink to="/admin/subscriptions" className={linkClass}>
            📦 Subscriptions
          </NavLink>

          <NavLink to="/admin/payments" className={linkClass}>
            💳 Payments
          </NavLink>

          <NavLink to="/admin/reports" className={linkClass}>
            📈 Reports
          </NavLink>
        </nav>
      </div>

      <div className="mt-6">
        <DarkModeToggle />
      </div>
    </aside>
  );
}