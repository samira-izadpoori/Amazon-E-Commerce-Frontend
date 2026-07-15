import DashboardStats from "../../components/dashboard/DashboardStats";
import RecentOrders from "../../components/dashboard/RecentOrders";

export default function OverviewPage() {
  return (
    <section>
      <h1 className="mb-6 text-2xl font-bold">Dashboard Overview</h1>

      <DashboardStats />

      <RecentOrders />
    </section>
  );
}
