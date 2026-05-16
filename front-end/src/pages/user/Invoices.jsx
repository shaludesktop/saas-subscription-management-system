import Sidebar from "../../components/layout/Sidebar";
import InvoiceTable from "../../components/tables/InvoiceTable";
import useFetch from "../../hooks/useFetch";
import { getMyInvoices } from "../../api/invoiceApi";

export default function Invoices() {
  const { data: invoices = [], loading, error } = useFetch(getMyInvoices);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-950 transition">
      <Sidebar />

      <main className="flex-1 p-6 text-gray-900 dark:text-white">
        <h1 className="text-3xl font-bold mb-6">Invoices</h1>

        {loading && (
          <p className="text-gray-500 dark:text-gray-400">
            Loading invoices...
          </p>
        )}

        {error && (
          <p className="text-red-600 dark:text-red-400">
            Failed to load invoices
          </p>
        )}

        {!loading && invoices.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 dark:border-slate-700 p-10 text-center text-gray-500 dark:text-gray-400">
            No invoices found
          </div>
        )}

        {!loading && invoices.length > 0 && (
          <InvoiceTable invoices={invoices} />
        )}
      </main>
    </div>
  );
}