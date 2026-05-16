import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function SubscriptionBarChart({
  subscriptions = [],
}) {
  const grouped = {};

  subscriptions.forEach((s) => {
    const appName = s.appId?.name || "Unknown";
    grouped[appName] = (grouped[appName] || 0) + 1;
  });

  const data = Object.keys(grouped).map((app) => ({
    app,
    subscriptions: grouped[app],
  }));

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
      
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Subscriptions by App
        </h2>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Most subscribed SaaS applications
        </p>
      </div>

      {data.length === 0 ? (
        <div className="flex h-[300px] items-center justify-center rounded-xl border border-dashed border-slate-300 text-slate-500 dark:border-slate-700 dark:text-slate-400">
          No app subscription data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data}>
            
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#334155"
            />

            <XAxis
              dataKey="app"
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "10px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="subscriptions"
              fill="#7c3aed"
              radius={[10, 10, 0, 0]}
              barSize={45}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}