
export type CreateOrderPayload = {
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    country: string;
  };
  items: Array<{
    productId: string;
    title: string;
    price: number;
    quantity: number;
  }>;
};