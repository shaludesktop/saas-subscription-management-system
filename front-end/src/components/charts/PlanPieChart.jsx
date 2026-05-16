import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#f97316", "#9333ea", "#dc2626"];

export default function PlanPieChart({ subscriptions = [] }) {
  const grouped = {};

  subscriptions.forEach((s) => {
    const planName = s.planId?.name || "Unknown";
    grouped[planName] = (grouped[planName] || 0) + 1;
  });

  const data = Object.keys(grouped).map((name) => ({
    name,
    value: grouped[name],
  }));

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Plan Distribution
        </h2>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Number of subscriptions per plan
        </p>
      </div>

      {data.length === 0 ? (
        <div className="flex h-[300px] items-center justify-center rounded-xl border border-dashed border-slate-300 text-slate-500 dark:border-slate-700 dark:text-slate-400">
          No subscription data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={105}
              paddingAngle={4}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "10px",
                color: "#fff",
              }}
            />

            <Legend wrapperStyle={{ color: "#64748b" }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}