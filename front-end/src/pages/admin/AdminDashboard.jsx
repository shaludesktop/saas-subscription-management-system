import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/layout/AdminSidebar";
import StatsCard from "../../components/cards/StatsCard";
import useFetch from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import { getAllUsers } from "../../api/userApi";
import { getSaasApps } from "../../api/saasAppApi";
import { getAllSubscriptions } from "../../api/subscriptionApi";
import { getAllPayments } from "../../api/paymentApi";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { data: users = [] } = useFetch(getAllUsers);
  const { data: apps = [] } = useFetch(getSaasApps);
  const { data: subs = [] } = useFetch(getAllSubscriptions);
  const { data: payments = [] } = useFetch(getAllPayments);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const paidPayments = payments.filter((p) => p.status === "paid");

  const revenue = paidPayments.reduce(
    (sum, p) => sum + (Number(p.amount) || 0),
    0
  );

  const activeSubs = subs.filter((s) => s.status === "active").length;
  const cancelledSubs = subs.filter((s) => s.status === "cancelled").length;
  const pendingSubs = subs.filter((s) => s.status === "pending").length;

  const recentPayments = payments.slice(0, 5);
  const recentSubscriptions = subs.slice(0, 5);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-950 transition">
      <AdminSidebar />

      <main className="flex-1 p-6 text-gray-900 dark:text-white">
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-700 p-8 text-white shadow-lg">
          <p className="text-sm opacity-80">Admin Overview</p>

          <h1 className="mt-2 text-3xl font-bold">Admin Dashboard</h1>

          <p className="mt-2 text-purple-100">
            Manage users, SaaS apps, plans, subscriptions, payments, and revenue.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/admin/saas-apps"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-50"
            >
              Add SaaS App
            </Link>

            <Link
              to="/admin/plans"
              className="rounded-lg bg-purple-500 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-400"
            >
              Add Plan
            </Link>

            <Link
              to="/admin/reports"
              className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
            >
              View Reports
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-4">
          <StatsCard title="Users" value={users.length} icon="👥" />
          <StatsCard title="Apps" value={apps.length} icon="🧩" color="purple" />
          <StatsCard title="Subscriptions" value={subs.length} icon="📦" color="green" />
          <StatsCard title="Revenue" value={`₹${revenue}`} icon="💰" color="yellow" />
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-slate-900">
            <h2 className="text-xl font-bold">Subscription Status</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Overall subscription breakdown
            </p>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Active</span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                  {activeSubs}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Pending</span>
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300">
                  {pendingSubs}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Cancelled</span>
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700 dark:bg-red-900/40 dark:text-red-300">
                  {cancelledSubs}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-slate-900">
            <h2 className="text-xl font-bold">Quick Actions</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Fast admin operations
            </p>

            <div className="mt-5 grid gap-3">
              <Link
                to="/admin/users"
                className="rounded-xl border border-gray-200 p-4 hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                👥 Manage Users
              </Link>

              <Link
                to="/admin/saas-apps"
                className="rounded-xl border border-gray-200 p-4 hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                🧩 Manage SaaS Apps
              </Link>

              <Link
                to="/admin/payments"
                className="rounded-xl border border-gray-200 p-4 hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                💳 View Payments
              </Link>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-slate-900">
            <h2 className="text-xl font-bold">System Summary</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Current platform status
            </p>

            <div className="mt-5 space-y-3 text-sm">
              <p className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Paid Payments
                </span>
                <strong>{paidPayments.length}</strong>
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Total Revenue
                </span>
                <strong>₹{revenue}</strong>
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Available Apps
                </span>
                <strong>{apps.length}</strong>
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Total Users
                </span>
                <strong>{users.length}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-slate-900">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Recent Payments</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Latest payment transactions
                </p>
              </div>

              <Link
                to="/admin/payments"
                className="rounded-lg bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {recentPayments.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No recent payments.
                </p>
              ) : (
                recentPayments.map((payment) => (
                  <div
                    key={payment._id}
                    className="flex items-center justify-between rounded-xl border border-gray-200 p-4 dark:border-slate-700"
                  >
                    <div>
                      <p className="font-semibold">
                        {payment.subscriptionId?.appId?.name || "App"}
                      </p>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {payment.subscriptionId?.planId?.name || "Plan"} •{" "}
                        {payment.paymentMethod || "UPI"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold">₹{payment.amount}</p>

                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-slate-900">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Recent Subscriptions</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Latest subscription activity
                </p>
              </div>

              <Link
                to="/admin/subscriptions"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {recentSubscriptions.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No recent subscriptions.
                </p>
              ) : (
                recentSubscriptions.map((sub) => (
                  <div
                    key={sub._id}
                    className="flex items-center justify-between rounded-xl border border-gray-200 p-4 dark:border-slate-700"
                  >
                    <div>
                      <p className="font-semibold">
                        {sub.appId?.name || "App"}
                      </p>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {sub.planId?.name || "Plan"} •{" "}
                        {sub.userId?.name || "User"}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        sub.status === "active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                          : sub.status === "cancelled"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}