import { Link } from "react-router-dom";

export default function AppCard({ app }) {
  return (
    <div className="rounded-xl bg-white dark:bg-slate-900 p-6 shadow hover:shadow-lg transition border border-gray-200 dark:border-slate-700">
      
      {/* Logo */}
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded bg-gray-50 dark:bg-slate-800">
        <img
          src={app.logo}
          alt={app.name}
          className="max-h-full max-w-full object-contain"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/100?text=Logo";
          }}
        />
      </div>

      {/* App Name */}
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        {app.name}
      </h2>

      {/* Category */}
      <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
        {app.category}
      </p>

      {/* Description */}
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
        {app.description}
      </p>

      {/* Button */}
      <Link
        to={`/apps/${app._id}/plans`}
        className="mt-5 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
      >
        View Plans
      </Link>
    </div>
  );
}