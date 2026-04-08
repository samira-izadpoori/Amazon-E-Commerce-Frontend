import type { CreateOrderPayload } from "../types/orderType";
import { http } from "./http";

// export type CreateOrderPayload = {
//   customer: {
//     name: string;
//     email: string;
//     address: string;
//     city: string;
//     country: string;
//   };
//   items: Array<{
//     productId: string;
//     title: string;
//     price: number;
//     quantity: number;
//   }>;
// };

export async function createOrder(payload: CreateOrderPayload) {
  const { data } = await http.post("/orders", payload);
  return data;
}

export async function fetchOrder(id: string) {
  const { data } = await http.get(`/orders/${id}`);
  return data;
}