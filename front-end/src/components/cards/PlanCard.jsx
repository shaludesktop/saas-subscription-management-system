export default function PlanCard({ plan, onSubscribe }) {
  return (
    <div
      className={`relative rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-md transition transform hover:scale-105 hover:shadow-xl border ${
        plan.isRecommended
          ? "border-blue-500"
          : "border-gray-200 dark:border-slate-700"
      }`}
    >
      {plan.isRecommended && (
        <span className="absolute top-3 right-3 rounded-full bg-blue-600 px-3 py-1 text-xs text-white">
          Most Popular
        </span>
      )}

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        {plan.name}
      </h2>

      <p className="mt-4 text-4xl font-bold text-blue-600 dark:text-blue-400">
        ₹{plan.price}
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          /{plan.duration}
        </span>
      </p>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Seats allowed: {plan.seatLimit || plan.maxSubscriptions || 1}
      </p>

      <ul className="mt-6 space-y-3">
        {plan.features?.map((feature, index) => (
          <li
            key={index}
            className="flex items-center text-sm text-gray-700 dark:text-gray-300"
          >
            <span className="mr-2 text-green-500">✔</span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSubscribe?.(plan)}
        className={`mt-8 w-full rounded-lg py-2 font-medium transition ${
          plan.isRecommended
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
        }`}
      >
        {plan.price === 0 ? "Start Free" : "Subscribe"}
      </button>
    </div>
  );
}