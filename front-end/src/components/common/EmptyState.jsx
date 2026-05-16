export default function EmptyState({ message = "No data found" }) {
  return (
    <div className="text-center text-gray-500 py-10">
      <p>{message}</p>
    </div>
  );
}