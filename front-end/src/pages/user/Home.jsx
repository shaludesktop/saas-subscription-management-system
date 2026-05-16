import Navbar from "../../components/layout/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Navbar />

      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 px-6 py-20 transition">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="max-w-xl text-5xl font-extrabold leading-tight text-slate-900 dark:text-white md:text-6xl">
              Manage Your SaaS Subscriptions Easily
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Subscribe, renew, upgrade, downgrade, and manage services like
              Canva, Zoom, Slack, Netflix, and more from one platform.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/apps"
                className="rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white shadow hover:bg-blue-700"
              >
                View Apps
              </Link>

              <Link
                to="/register"
                className="rounded-lg border border-blue-300 bg-white px-7 py-3 font-semibold text-slate-800 shadow hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rotate-2 rounded-3xl bg-white/90 p-5 shadow-2xl ring-1 ring-blue-100 dark:bg-slate-900 dark:ring-slate-700">
              <div className="grid grid-cols-[180px_1fr] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="bg-slate-950 p-5 text-white">
                  <h3 className="mb-8 text-sm font-bold">SaaS Panel</h3>

                  <div className="space-y-4 text-sm">
                    <p className="rounded-lg bg-blue-600 px-3 py-2">
                      📊 Dashboard
                    </p>
                    <p className="px-3 py-2 text-slate-300">📦 Subscriptions</p>
                    <p className="px-3 py-2 text-slate-300">💳 Payments</p>
                    <p className="px-3 py-2 text-slate-300">📄 Invoices</p>
                    <p className="px-3 py-2 text-slate-300">👤 Profile</p>
                  </div>
                </div>

                <div className="bg-white p-6 dark:bg-slate-800">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      My Subscriptions
                    </h2>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                      Live
                    </span>
                  </div>

                  <div className="space-y-4">
                    {[
                      ["🎨", "Canva", "Pro Plan", "Renews on 12 May 2026"],
                      ["🎥", "Zoom", "Business Plan", "Renews on 18 May 2026"],
                      ["💬", "Slack", "Standard Plan", "Renews on 25 May 2026"],
                      ["🎬", "Netflix", "Premium Plan", "Renews on 02 Jun 2026"],
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                            {item[0]}
                          </span>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {item[1]}
                            </p>
                            <p className="text-xs text-slate-500">{item[2]}</p>
                          </div>
                        </div>

                        <p className="hidden text-xs text-slate-500 md:block">
                          {item[3]}
                        </p>

                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Active
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-12 left-10 rounded-2xl bg-white p-5 shadow-xl dark:bg-slate-900">
              <h3 className="mb-3 font-bold text-slate-900 dark:text-white">
                Spending Overview
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-[14px] border-blue-500 text-sm font-bold text-slate-800 dark:text-white">
                  ₹2,499
                </div>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <p>🔵 Canva</p>
                  <p>🟣 Zoom</p>
                  <p>🟢 Slack</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-6 bottom-20 rounded-2xl bg-white p-5 shadow-xl dark:bg-slate-900">
              <h3 className="mb-3 font-bold text-slate-900 dark:text-white">
                Summary
              </h3>
              <p className="text-sm text-slate-500">Total Subscriptions</p>
              <p className="text-2xl font-bold text-blue-600">4</p>
              <p className="mt-3 text-sm text-slate-500">Monthly Spending</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                ₹2,499
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}