export default function SubscriptionTable({
  subscriptions = [],
  onRenew,
  onCancel,
}) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-md dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
      <table className="w-full text-sm text-slate-800 dark:text-slate-200">
        <thead className="bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-200">
          <tr>
            <th className="p-4 text-left">App</th>
            <th className="p-4 text-left">Plan</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">End Date</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {subscriptions.map((sub) => (
            <tr
              key={sub._id}
              className="border-t border-gray-200 transition hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <td className="p-4 font-medium text-slate-800 dark:text-slate-200">
                {sub.appId?.name || "-"}
              </td>

              <td className="p-4 text-slate-700 dark:text-slate-300">
                {sub.planId?.name || "-"}
              </td>

              <td className="p-4">
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
              </td>

              <td className="p-4 text-slate-700 dark:text-slate-300">
                {sub.endDate
                  ? new Date(sub.endDate).toLocaleDateString()
                  : "-"}
              </td>

              <td className="p-4">
                <div className="flex gap-2">
                  {onRenew && (
                    <button
                      onClick={() => onRenew(sub._id)}
                      className="rounded-lg bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                    >
                      Renew
                    </button>
                  )}

                  {onCancel && (
                    <button
                      onClick={() => onCancel(sub._id)}
                      className="rounded-lg bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  )}

                  {!onRenew && !onCancel && (
                    <span className="text-slate-500 dark:text-slate-400">
                      View only
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}

          {subscriptions.length === 0 && (
            <tr>
              <td
                colSpan="5"
                className="p-10 text-center text-slate-500 dark:text-slate-400"
              >
                No subscriptions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}