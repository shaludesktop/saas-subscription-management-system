export default function UserTable({ users = [] }) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-md dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
      <table className="w-full text-sm">
        
        <thead className="bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-200">
          <tr>
            <th className="p-4 text-left">User</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Joined</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-t border-gray-200 hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800 transition"
            >
              <td className="p-4">
                <div className="flex items-center gap-3">
                  
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {user.name}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      User ID: {user._id?.slice(-6)}
                    </p>
                  </div>
                </div>
              </td>

              <td className="p-4 text-gray-600 dark:text-slate-300">
                {user.email}
              </td>

              <td className="p-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                  }`}
                >
                  {user.role}
                </span>
              </td>

              <td className="p-4 text-gray-600 dark:text-slate-300">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td
                colSpan="4"
                className="p-10 text-center text-gray-500 dark:text-slate-400"
              >
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}