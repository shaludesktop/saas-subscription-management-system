const colorClasses = {
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300",
  green: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300",
  purple:
    "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300",
  red: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300",
  yellow:
    "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-300",
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  color = "blue",
  trend,
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-md transition hover:shadow-lg border border-gray-100 dark:border-slate-700">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>

        <h2 className="mt-1 text-3xl font-bold text-gray-800 dark:text-white">
          {value}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {subtitle}
          </p>
        )}

        {trend !== undefined && (
          <p
            className={`mt-1 text-sm ${
              trend > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {trend > 0 ? "▲" : "▼"} {Math.abs(trend)}%
          </p>
        )}
      </div>

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
          colorClasses[color] || colorClasses.blue
        }`}
      >
        {icon || "📊"}
      </div>
    </div>
  );
}