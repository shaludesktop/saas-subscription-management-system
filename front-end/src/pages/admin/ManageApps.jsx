import { useState } from "react";
import AdminSidebar from "../../components/layout/AdminSidebar";
import AppTable from "../../components/tables/AppTable";
import useFetch from "../../hooks/useFetch";
import {
  getSaasApps,
  createSaasApp,
  deleteSaasApp,
} from "../../api/saasAppApi";

export default function ManageApps() {
  const { data: apps = [], loading, error, refetch } = useFetch(getSaasApps);

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    logo: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await createSaasApp(form);
      setForm({ name: "", category: "", description: "", logo: "" });
      refetch();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add app");
    }
  };

  const remove = async (id) => {
    if (!confirm("Are you sure you want to delete this app?")) return;

    try {
      await deleteSaasApp(id);
      refetch();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete app");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-950 transition">
      <AdminSidebar />

      <main className="flex-1 p-6 text-gray-900 dark:text-white">
        <h1 className="mb-6 text-3xl font-bold">Manage SaaS Apps</h1>

        <form
          onSubmit={submit}
          className="mb-6 grid gap-4 rounded-xl bg-white p-5 shadow dark:bg-slate-900 md:grid-cols-4 border border-gray-200 dark:border-slate-700"
        >
          <input
            className="rounded border border-gray-300 bg-white p-3 text-gray-800 outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="rounded border border-gray-300 bg-white p-3 text-gray-800 outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input
            className="rounded border border-gray-300 bg-white p-3 text-gray-800 outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            className="rounded border border-gray-300 bg-white p-3 text-gray-800 outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="Logo URL"
            value={form.logo}
            onChange={(e) => setForm({ ...form, logo: e.target.value })}
          />

          <button className="rounded bg-purple-600 py-3 text-white hover:bg-purple-700 md:col-span-4">
            Add App
          </button>
        </form>

        {loading && (
          <p className="text-gray-500 dark:text-gray-400">Loading apps...</p>
        )}

        {error && (
          <p className="text-red-600 dark:text-red-400">
            Failed to load apps
          </p>
        )}

        {!loading && apps.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500 dark:border-slate-700 dark:text-gray-400">
            No apps found
          </div>
        )}

        {!loading && apps.length > 0 && (
          <AppTable apps={apps} onDelete={remove} />
        )}
      </main>
    </div>
  );
}