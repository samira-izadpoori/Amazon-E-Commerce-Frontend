import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type { ReactNode } from "react";
import { cartReducer, initialCartState } from "./cartReducer";
import type { CartItem, CartState } from "./cartTypes";

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "cart_v1";

function loadCartFromStorage(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialCartState;

    const parsed = JSON.parse(raw) as CartState;
    if (!parsed?.items || !Array.isArray(parsed.items)) {
      return initialCartState;
    }

    return parsed;
  } catch {
    return initialCartState;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    undefined,
    loadCartFromStorage,
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<CartContextValue>(() => {
    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return {
      items: state.items,
      addItem: (item, quantity = 1) =>
        dispatch({ type: "ADD_ITEM", payload: { ...item, quantity } }),
      removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } }),
      setQuantity: (id, quantity) =>
        dispatch({ type: "SET_QUANTITY", payload: { id, quantity } }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
      totalItems,
      totalPrice,
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider>");
  }

  return ctx;
}
