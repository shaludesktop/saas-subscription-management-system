import AdminSidebar from "../../components/layout/AdminSidebar";
import StatsCard from "../../components/cards/StatsCard";
import useFetch from "../../hooks/useFetch";
import { getAllPayments } from "../../api/paymentApi";
import { getAllSubscriptions } from "../../api/subscriptionApi";

import RevenueLineChart from "../../components/charts/RevenueLineChart";
import PlanPieChart from "../../components/charts/PlanPieChart";
import SubscriptionBarChart from "../../components/charts/SubscriptionBarChart";

export default function RevenueReports() {
  const paymentsFetch = useFetch(getAllPayments);
  const subscriptionsFetch = useFetch(getAllSubscriptions);

  const payments = paymentsFetch.data || [];
  const subscriptions = subscriptionsFetch.data || [];

  const paidOnly = payments.filter((p) => p.status === "paid");

  const totalRevenue = paidOnly.reduce(
    (sum, p) => sum + (Number(p.amount) || 0),
    0
  );

  const paidPayments = paidOnly.length;

  const activeSubs = subscriptions.filter(
    (s) => s.status === "active"
  ).length;

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950 transition">
      <AdminSidebar />

      <main className="flex-1 p-6 text-gray-900 dark:text-white">
        <h1 className="mb-6 text-3xl font-bold">Revenue Reports</h1>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <StatsCard
            title="Total Revenue"
            value={`₹${totalRevenue}`}
            icon="💰"
            color="yellow"
          />

          <StatsCard
            title="Paid Payments"
            value={paidPayments}
            icon="💳"
            color="green"
          />

          <StatsCard
            title="Active Subscriptions"
            value={activeSubs}
            icon="📦"
            color="blue"
          />
        </div>

        {(paymentsFetch.loading || subscriptionsFetch.loading) && (
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            Loading report data...
          </p>
        )}

        {(paymentsFetch.error || subscriptionsFetch.error) && (
          <p className="mb-6 text-red-600 dark:text-red-400">
            Failed to load report data
          </p>
        )}

        {!paymentsFetch.loading && paidOnly.length === 0 && (
          <div className="mb-6 rounded-xl bg-yellow-100 p-4 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
            No paid payment data found. Create a paid subscription to show the
            revenue chart.
          </div>
        )}

        <div className="mb-8">
          <RevenueLineChart payments={paidOnly} />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <PlanPieChart subscriptions={subscriptions} />
          <SubscriptionBarChart subscriptions={subscriptions} />
        </div>
      </main>
    </div>
  );
}