import AdminSidebar from "../../components/layout/AdminSidebar";
import SubscriptionTable from "../../components/tables/SubscriptionTable";
import useFetch from "../../hooks/useFetch";
import { getAllSubscriptions } from "../../api/subscriptionApi";

export default function ManageSubscriptions() {
  const { data: subscriptions = [], loading, error } =
    useFetch(getAllSubscriptions);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-950 transition">
      <AdminSidebar />

      <main className="flex-1 p-6 text-gray-900 dark:text-white">
        <h1 className="mb-6 text-3xl font-bold">All Subscriptions</h1>

        {loading && (
          <p className="text-gray-500 dark:text-gray-400">
            Loading subscriptions...
          </p>
        )}

        {error && (
          <p className="text-red-600 dark:text-red-400">
            Failed to load subscriptions
          </p>
        )}

        {!loading && subscriptions.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500 dark:border-slate-700 dark:text-gray-400">
            No subscriptions found
          </div>
        )}

        {!loading && subscriptions.length > 0 && (
          <SubscriptionTable subscriptions={subscriptions} />
        )}
      </main>
    </div>
  );
}