import Sidebar from "../../components/layout/Sidebar";
import PaymentTable from "../../components/tables/PaymentTable";
import useFetch from "../../hooks/useFetch";
import { getMyPayments } from "../../api/paymentApi";

export default function Payments() {
  const { data: payments = [], loading, error } = useFetch(getMyPayments);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-950 transition">
      <Sidebar />

      <main className="flex-1 p-6 text-gray-900 dark:text-white">
        <h1 className="text-3xl font-bold mb-6">Payments</h1>

        {loading && (
          <p className="text-gray-500 dark:text-gray-400">Loading payments...</p>
        )}

        {error && (
          <p className="text-red-600 dark:text-red-400">
            Failed to load payments
          </p>
        )}

        {!loading && payments.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 dark:border-slate-700 p-10 text-center text-gray-500 dark:text-gray-400">
            No payments found
          </div>
        )}

        {!loading && payments.length > 0 && (
          <PaymentTable payments={payments} />
        )}
      </main>
    </div>
  );
}