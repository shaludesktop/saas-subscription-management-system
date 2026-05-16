import Sidebar from "../../components/layout/Sidebar";
import SubscriptionTable from "../../components/tables/SubscriptionTable";
import {
  getMySubscriptions,
  renewSubscription,
  cancelSubscription,
} from "../../api/subscriptionApi";
import useFetch from "../../hooks/useFetch";

export default function Subscriptions() {
  const { data: subscriptions = [], loading, error, refetch } =
    useFetch(getMySubscriptions);

  const renew = async (id) => {
    await renewSubscription(id);
    refetch();
  };

  const cancel = async (id) => {
    await cancelSubscription(id);
    refetch();
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-950 transition">
      <Sidebar />

      <main className="flex-1 p-6 text-gray-900 dark:text-white">
        <h1 className="mb-6 text-3xl font-bold">My Subscriptions</h1>

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
          <div className="rounded-xl border border-dashed border-gray-300 dark:border-slate-700 p-10 text-center text-gray-500 dark:text-gray-400">
            No subscriptions found
          </div>
        )}

        {!loading && subscriptions.length > 0 && (
          <SubscriptionTable
            subscriptions={subscriptions}
            onRenew={renew}
            onCancel={cancel}
          />
        )}
      </main>
    </div>
  );
}