import { useState } from "react";
import AdminSidebar from "../../components/layout/AdminSidebar";
import PlanTable from "../../components/tables/PlanTable";
import useFetch from "../../hooks/useFetch";
import { getPlans, createPlan, deletePlan } from "../../api/planApi";
import { getSaasApps } from "../../api/saasAppApi";

export default function ManagePlans() {
  const plans = useFetch(getPlans);
  const apps = useFetch(getSaasApps);

  const [form, setForm] = useState({
    appId: "",
    name: "",
    price: "",
    duration: "monthly",
    features: "",
    seatLimit: 1,
  });

  const inputClass =
    "rounded border border-gray-300 bg-white p-3 text-gray-800 outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white";

  const submit = async (e) => {
    e.preventDefault();

    try {
      await createPlan({
        ...form,
        price: Number(form.price),
        seatLimit: Number(form.seatLimit),
        features: form.features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
      });

      setForm({
        appId: "",
        name: "",
        price: "",
        duration: "monthly",
        features: "",
        seatLimit: 1,
      });

      plans.refetch();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add plan");
    }
  };

  const remove = async (id) => {
    if (!confirm("Are you sure you want to delete this plan?")) return;

    try {
      await deletePlan(id);
      plans.refetch();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete plan");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-950 transition">
      <AdminSidebar />

      <main className="flex-1 p-6 text-gray-900 dark:text-white">
        <h1 className="mb-6 text-3xl font-bold">Manage Plans</h1>

        <form
          onSubmit={submit}
          className="mb-6 grid gap-4 rounded-xl bg-white p-5 shadow dark:bg-slate-900 md:grid-cols-3 border border-gray-200 dark:border-slate-700"
        >
          <select
            className={inputClass}
            value={form.appId}
            onChange={(e) => setForm({ ...form, appId: e.target.value })}
          >
            <option value="">Select App</option>
            {(apps.data || []).map((app) => (
              <option key={app._id} value={app._id}>
                {app.name}
              </option>
            ))}
          </select>

          <input
            className={inputClass}
            placeholder="Plan name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className={inputClass}
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <select
            className={inputClass}
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
          >
            <option value="free">Free</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          <input
            className={inputClass}
            placeholder="Features comma separated"
            value={form.features}
            onChange={(e) => setForm({ ...form, features: e.target.value })}
          />

          <input
            className={inputClass}
            placeholder="Seat limit"
            type="number"
            value={form.seatLimit}
            onChange={(e) =>
              setForm({ ...form, seatLimit: e.target.value })
            }
          />

          <button className="rounded bg-purple-600 py-3 text-white hover:bg-purple-700 md:col-span-3">
            Add Plan
          </button>
        </form>

        {plans.loading && (
          <p className="text-gray-500 dark:text-gray-400">Loading plans...</p>
        )}

        {plans.error && (
          <p className="text-red-600 dark:text-red-400">
            Failed to load plans
          </p>
        )}

        {!plans.loading && (plans.data || []).length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500 dark:border-slate-700 dark:text-gray-400">
            No plans found
          </div>
        )}

        {!plans.loading && (plans.data || []).length > 0 && (
          <PlanTable plans={plans.data || []} onDelete={remove} />
        )}
      </main>
    </div>
  );
}