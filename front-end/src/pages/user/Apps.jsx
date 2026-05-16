import Sidebar from "../../components/layout/Sidebar";
import AppCard from "../../components/cards/AppCard";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";
import useFetch from "../../hooks/useFetch";
import { getSaasApps } from "../../api/saasAppApi";

export default function Apps() {
  const { data: apps = [], loading, error } = useFetch(getSaasApps);

  if (loading) return <Loader />;

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-950 transition">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 text-gray-900 dark:text-white">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Available SaaS Apps
          </h1>

          <p className="mt-2 text-gray-600 dark:text-slate-400">
            Browse and manage your favorite SaaS platforms.
          </p>
        </div>

        <ErrorMessage message={error} />

        {/* Empty State */}
        {apps.length === 0 ? (
          <EmptyState message="No SaaS apps found" />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {apps.map((app) => (
              <AppCard key={app._id} app={app} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}