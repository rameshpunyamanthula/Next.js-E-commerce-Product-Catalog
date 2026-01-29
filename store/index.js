import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";

/* 🔒 Safe check */
const isBrowser = typeof window !== "undefined";

/* 🔹 Load cart from localStorage (browser only) */
const loadCartState = () => {
  if (!isBrowser) return undefined;

  try {
    const serialized = localStorage.getItem("cartState");
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch {
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  preloadedState: {
    cart: loadCartState(),
  },
});

/* 🔹 Save cart to localStorage (browser only) */
if (isBrowser) {
  store.subscribe(() => {
    try {
      localStorage.setItem(
        "cartState",
        JSON.stringify(store.getState().cart)
      );
    } catch {}
  });
}
