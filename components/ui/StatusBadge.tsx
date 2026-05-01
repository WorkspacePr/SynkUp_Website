export default function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    Active: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Suspended: "bg-gray-200 text-gray-700",
    Inactive: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`text-xs px-3 py-1 rounded-full font-medium ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}
