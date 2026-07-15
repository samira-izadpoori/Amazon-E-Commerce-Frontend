
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/layout/DashboardSidebar";
import DashboardHeader from "../components/layout/DashboardHeader";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <DashboardSidebar />

      <main className="flex-1 p-8">
        <DashboardHeader />
        <Outlet />
      </main>
    </div>
  );
}
