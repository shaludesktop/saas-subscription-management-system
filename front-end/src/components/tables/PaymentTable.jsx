export default function PaymentTable({ payments = [] }) {
  const totalAmount = payments.reduce(
    (sum, p) => sum + (Number(p.amount) || 0),
    0
  );

  const paidCount = payments.filter((p) => p.status === "paid").length;

  return (
    <div className="overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-md border border-gray-200 dark:border-slate-700">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 px-6 py-5 text-white">
        <h2 className="text-xl font-bold">Payment History</h2>

        <p className="text-sm text-purple-100">
          Track all subscription payment transactions
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 p-6 md:grid-cols-3">
        
        <div className="rounded-xl bg-purple-50 dark:bg-purple-900/30 p-4">
          <p className="text-sm text-purple-600 dark:text-purple-300">
            Total Payments
          </p>

          <h3 className="mt-1 text-2xl font-bold text-purple-800 dark:text-purple-200">
            {payments.length}
          </h3>
        </div>

        <div className="rounded-xl bg-green-50 dark:bg-green-900/30 p-4">
          <p className="text-sm text-green-600 dark:text-green-300">
            Paid Transactions
          </p>

          <h3 className="mt-1 text-2xl font-bold text-green-800 dark:text-green-200">
            {paidCount}
          </h3>
        </div>

        <div className="rounded-xl bg-blue-50 dark:bg-blue-900/30 p-4">
          <p className="text-sm text-blue-600 dark:text-blue-300">
            Total Amount
          </p>

          <h3 className="mt-1 text-2xl font-bold text-blue-800 dark:text-blue-200">
            ₹{totalAmount}
          </h3>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-slate-800 dark:text-slate-200">
          
          <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
            <tr>
              <th className="p-4 text-left">Application</th>
              <th className="p-4 text-left">Plan</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Method</th>
              <th className="p-4 text-left">Transaction ID</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((pay) => (
              <tr
                key={pay._id}
                className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                <td className="p-4 font-medium text-slate-800 dark:text-slate-200">
                  {pay.subscriptionId?.appId?.name || "-"}
                </td>

                <td className="p-4 text-slate-800 dark:text-slate-200">
                  {pay.subscriptionId?.planId?.name || "-"}
                </td>

                <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                  ₹{pay.amount}
                </td>

                <td className="p-4 text-slate-700 dark:text-slate-300">
                  {pay.paymentMethod || "-"}
                </td>

                <td className="p-4 text-xs text-slate-500 dark:text-slate-400">
                  {pay.transactionId || "-"}
                </td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      pay.status === "paid"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                        : pay.status === "failed"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                    }`}
                  >
                    {pay.status}
                  </span>
                </td>

                <td className="p-4 text-slate-700 dark:text-slate-300">
                  {new Date(pay.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {payments.length === 0 && (
          <div className="p-10 text-center text-slate-500 dark:text-slate-400">
            No payments found
          </div>
        )}
      </div>
    </div>
  );
}