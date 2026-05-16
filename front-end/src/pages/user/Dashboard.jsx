import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import StatsCard from "../../components/cards/StatsCard";
import SubscriptionTable from "../../components/tables/SubscriptionTable";

import {
  getMySubscriptions,
  renewSubscription,
  cancelSubscription,
} from "../../api/subscriptionApi";

import useFetch from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();

  const {
    data: subscriptions = [],
    refetch,
  } = useFetch(getMySubscriptions);

  const active = subscriptions.filter(
    (s) => s.status === "active"
  ).length;

  const cancelled = subscriptions.filter(
    (s) => s.status === "cancelled"
  ).length;

  const expiringSoonList = subscriptions.filter((s) => {
    const today = new Date();
    const end = new Date(s.endDate);

    const diffDays = Math.ceil(
      (end - today) / (1000 * 60 * 60 * 24)
    );

    return (
      diffDays <= 7 &&
      diffDays >= 0 &&
      s.status === "active"
    );
  });

  const recentActivity = subscriptions.slice(0, 4);

  const renew = async (id) => {
    await renewSubscription(id);
    refetch();
  };

  const cancel = async (id) => {
    await cancelSubscription(id);
    refetch();
  };

  return (
    <>
      {/* TOP NAVBAR */}
      <Navbar />

      {/* MAIN LAYOUT */}
      <div className="flex min-h-[calc(100vh-72px)] bg-slate-100 dark:bg-slate-950 transition">
        
        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENT */}
        <main className="flex-1 p-6 text-gray-900 dark:text-white overflow-y-auto">

          {/* HERO */}
          <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg">
            <p className="text-sm opacity-80">
              Welcome back
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Hello, {user?.name || "User"} 👋
            </h1>

            <p className="mt-2 text-blue-100">
              Manage your SaaS subscriptions,
              renewals, and payments from one place.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/apps"
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
              >
                Browse Apps
              </Link>

              <Link
                to="/payments"
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400"
              >
                View Payments
              </Link>

              <Link
                to="/invoices"
                className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
              >
                Download Invoices
              </Link>
            </div>
          </div>

          {/* ALERT */}
          {expiringSoonList.length > 0 && (
            <div className="mb-6 rounded-xl border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-800 shadow dark:bg-yellow-900/30 dark:text-yellow-200">
              <h2 className="font-bold">
                ⚠️ {expiringSoonList.length} subscription(s) expiring soon
              </h2>

              <div className="mt-3 space-y-1">
                {expiringSoonList.map((sub) => (
                  <p key={sub._id} className="text-sm">
                    {sub.appId?.name} - {sub.planId?.name}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* STATS */}
          <div className="mb-8 grid gap-6 md:grid-cols-4">
            <StatsCard
              title="Total Subscriptions"
              value={subscriptions.length}
              icon="📦"
            />

            <StatsCard
              title="Active"
              value={active}
              icon="✅"
              color="green"
            />

            <StatsCard
              title="Expiring Soon"
              value={expiringSoonList.length}
              icon="⏳"
              color="yellow"
            />

            <StatsCard
              title="Cancelled"
              value={cancelled}
              icon="❌"
              color="red"
            />
          </div>

          {/* INFO CARDS */}
          <div className="mb-8 grid gap-6 lg:grid-cols-3">

            {/* UPCOMING */}
            <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-slate-900">
              <h2 className="text-xl font-bold">
                Upcoming Renewals
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Subscriptions ending soon
              </p>

              <div className="mt-5 space-y-3">
                {expiringSoonList.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No renewals due this week.
                  </p>
                ) : (
                  expiringSoonList.map((sub) => (
                    <div
                      key={sub._id}
                      className="rounded-xl border border-gray-200 p-4 dark:border-slate-700"
                    >
                      <p className="font-semibold">
                        {sub.appId?.name}
                      </p>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {sub.planId?.name}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* RECENT */}
            <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-slate-900">
              <h2 className="text-xl font-bold">
                Recent Activity
              </h2>

              <div className="mt-5 space-y-4">
                {recentActivity.map((sub) => (
                  <div key={sub._id} className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      ✔
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        {sub.appId?.name} subscription is {sub.status}
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Plan: {sub.planId?.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PROFILE */}
            <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-slate-900">
              <h2 className="text-xl font-bold">
                Profile Summary
              </h2>

              <div className="mt-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>

                <h3 className="mt-4 text-lg font-bold">
                  {user?.name}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>

                <p className="mt-3 inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-slate-900">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  My Subscriptions
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Track active plans, renew subscriptions,
                  or cancel anytime.
                </p>
              </div>

              <Link
                to="/apps"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
              >
                Add Subscription
              </Link>
            </div>

            <SubscriptionTable
              subscriptions={subscriptions}
              onRenew={renew}
              onCancel={cancel}
            />
          </div>
        </main>
      </div>
    </>
  );
}