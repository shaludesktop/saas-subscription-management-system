import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function RevenueLineChart({
  payments = [],
}) {
  const grouped = {};

  payments.forEach((p) => {
    if (p.status !== "paid") return;

    const date = new Date(
      p.createdAt
    ).toLocaleDateString();

    grouped[date] =
      (grouped[date] || 0) + Number(p.amount || 0);
  });

  const data = Object.keys(grouped).map((date) => ({
    date,
    revenue: grouped[date],
  }));

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
      
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Revenue Growth
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Paid revenue over time
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
          ₹ Revenue
        </span>
      </div>

      {data.length === 0 ? (
        <div className="flex h-[300px] items-center justify-center rounded-xl border border-dashed border-slate-300 text-slate-500 dark:border-slate-700 dark:text-slate-400">
          No revenue data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#334155"
            />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => [
                `₹${value}`,
                "Revenue",
              ]}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "10px",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={4}
              dot={{
                r: 5,
                strokeWidth: 2,
                fill: "#2563eb",
              }}
              activeDot={{
                r: 8,
                fill: "#2563eb",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}