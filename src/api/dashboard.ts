import { http } from "./http";

export type DashboardStat = {

  title: string;

  value: string | number;

};

export type RecentOrder = {

  id: string;

  status: string;

  date: string;

};

export async function fetchDashboardStats(): Promise<DashboardStat[]> {

  const { data } = await http.get<DashboardStat[]>("/dashboard/stats");

  return data;

}

export async function fetchRecentOrders(): Promise<RecentOrder[]> {

  const { data } = await http.get<RecentOrder[]>(

    "/dashboard/recent-orders",

  );

  return data;

}