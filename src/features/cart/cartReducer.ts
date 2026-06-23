
import type { CartAction, CartState } from "./cartTypes";

export const initialCartState: CartState = {
  items: [],
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const qtyToAdd = action.payload.quantity ?? 1;
      const existing = state.items.find((x) => x.id === action.payload.id);

      if (existing) {
        return {
          ...state,
          items: state.items.map((x) =>
            x.id === action.payload.id
              ? { ...x, quantity: x.quantity + qtyToAdd }
              : x
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            id: action.payload.id,
            title: action.payload.title,
            price: action.payload.price,
            image: action.payload.image,
            quantity: qtyToAdd,
          },
        ],
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((x) => x.id !== action.payload.id),
      };
    }

    case "SET_QUANTITY": {
      const q = Math.max(1, Math.floor(action.payload.quantity || 1));
      return {
        ...state,
        items: state.items.map((x) =>
          x.id === action.payload.id ? { ...x, quantity: q } : x
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
}