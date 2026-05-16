import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import useAuth from "../../hooks/useAuth";
import { updateUserProfile } from "../../api/userApi";

export default function Profile() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await updateUserProfile(form);
      alert("Profile updated");
    } catch (error) {
      alert(error.response?.data?.message || "Profile update failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-950 transition">
      <Sidebar />

      <main className="flex-1 p-6 text-gray-900 dark:text-white">
        <h1 className="mb-6 text-3xl font-bold">Profile</h1>

        <form
          onSubmit={submit}
          className="max-w-md rounded-xl bg-white dark:bg-slate-900 p-6 shadow border border-gray-200 dark:border-slate-700"
        >
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>

          <input
            className="mb-4 w-full rounded border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-gray-800 dark:text-white outline-none focus:border-blue-500"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>

          <input
            className="mb-4 w-full rounded border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-gray-800 dark:text-white outline-none focus:border-blue-500"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <button className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
            Update
          </button>
        </form>
      </main>
    </div>
  );
}