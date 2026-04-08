
import { http } from "./http";
import type { Product } from "../types/product";


export async function fetchProducts(): Promise<Product[]> {
  const { data } = await http.get<Product[]>("/products");
  return data;
}

export async function fetchProduct(id: string): Promise<Product> {
  const { data } = await http.get<Product>(`/products/${id}`);
  return data;
}