import AdminSidebar from "../../components/layout/AdminSidebar";
import UserTable from "../../components/tables/UserTable";
import useFetch from "../../hooks/useFetch";
import { getAllUsers } from "../../api/userApi";

export default function ManageUsers() {
  const { data: users = [], loading, error } = useFetch(getAllUsers);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-950 transition">
      <AdminSidebar />

      <main className="flex-1 p-6 text-gray-900 dark:text-white">
        <h1 className="mb-6 text-3xl font-bold">Manage Users</h1>

        {loading && (
          <p className="text-gray-500 dark:text-gray-400">Loading users...</p>
        )}

        {error && (
          <p className="text-red-600 dark:text-red-400">
            Failed to load users
          </p>
        )}

        {!loading && users.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500 dark:border-slate-700 dark:text-gray-400">
            No users found
          </div>
        )}

        {!loading && users.length > 0 && <UserTable users={users} />}
      </main>
    </div>
  );
}