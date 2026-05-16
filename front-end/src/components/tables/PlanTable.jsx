export default function PlanTable({ plans = [], onDelete }) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-md dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
      <table className="w-full text-sm">
        
        <thead className="bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-200">
          <tr>
            <th className="p-4 text-left">App</th>
            <th className="p-4 text-left">Plan</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Duration</th>
            <th className="p-4 text-left">Seats</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {plans.map((plan) => (
            <tr
              key={plan._id}
              className="border-t border-gray-200 hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800 transition"
            >
              <td className="p-4 font-medium text-gray-800 dark:text-white">
                {plan.appId?.name || "-"}
              </td>

              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {plan.name}
                  </span>

                  {plan.price > 0 && (
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                      Premium
                    </span>
                  )}
                </div>
              </td>

              <td className="p-4 font-semibold text-gray-800 dark:text-white">
                ₹{plan.price}
              </td>

              <td className="p-4 capitalize text-gray-600 dark:text-slate-300">
                {plan.duration}
              </td>

              <td className="p-4">
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                  {plan.seatLimit} Seats
                </span>
              </td>

              <td className="p-4">
                <button
                  onClick={() => onDelete?.(plan._id)}
                  className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {plans.length === 0 && (
            <tr>
              <td
                colSpan="6"
                className="p-10 text-center text-gray-500 dark:text-slate-400"
              >
                No plans found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}