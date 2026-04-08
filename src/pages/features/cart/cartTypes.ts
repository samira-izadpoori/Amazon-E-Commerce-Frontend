
export type CartItem = {
  id: string;          
  title: string;
  price: number;      
  image?: string;
  quantity: number;
};





export type CartState = {
  items: CartItem[];
};

export type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> & { quantity?: number } }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "SET_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };