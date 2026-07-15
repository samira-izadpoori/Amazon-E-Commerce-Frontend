import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats } from "../../api/dashboard";
import DashboardCard from "./DashboardCard";

export default function DashboardStats() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: fetchDashboardStats,
  });

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-3">
        {["Orders", "Wishlist", "Profile"].map((title) => (
          <div key={title} className="rounded-lg bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">{title}</p>
            <div className="mt-3 h-9 w-24 rounded-md bg-gray-100" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <p className="font-medium text-red-600">
          Failed to load dashboard statistics.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {data?.map((stat) => (
        <DashboardCard key={stat.title} title={stat.title} value={stat.value} />
      ))}
    </div>
  );
}