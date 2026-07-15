import { useQuery } from "@tanstack/react-query";
import { fetchRecentOrders } from "../../api/dashboard";

export default function RecentOrders() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dashboard", "recent-orders"],
    queryFn: fetchRecentOrders,
  });

  if (isLoading) {
    return (
      <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Loading recent orders...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
        <p className="font-medium text-red-600">
          Failed to load recent orders.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Recent Orders</h2>

      <div className="space-y-4">
        {data?.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0"
          >
            <div>
              <p className="font-medium text-gray-900">{order.id}</p>
              <p className="text-sm text-gray-500">{order.date}</p>
            </div>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
