export default function AppTable({ apps = [], onDelete }) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-md dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
      <table className="w-full text-sm">
        
        <thead className="bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-200">
          <tr>
            <th className="p-4 text-left">Logo</th>
            <th className="p-4 text-left">App Name</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {apps.map((app) => (
            <tr
              key={app._id}
              className="border-t border-gray-200 hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800 transition"
            >
              <td className="p-4">
                <img
                  src={app.logo}
                  alt={app.name}
                  className="h-12 w-12 rounded-xl object-cover border border-gray-200 dark:border-slate-700"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/100?text=Logo";
                  }}
                />
              </td>

              <td className="p-4 font-semibold text-gray-800 dark:text-white">
                {app.name}
              </td>

              <td className="p-4 text-gray-600 dark:text-slate-300">
                {app.category}
              </td>

              <td className="p-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    app.status === "active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                  }`}
                >
                  {app.status}
                </span>
              </td>

              <td className="p-4">
                <button
                  onClick={() => onDelete?.(app._id)}
                  className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {apps.length === 0 && (
            <tr>
              <td
                colSpan="5"
                className="p-10 text-center text-gray-500 dark:text-slate-400"
              >
                No SaaS apps found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}