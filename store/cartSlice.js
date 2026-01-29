import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart(state, action) {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    updateQuantity(state, action) {
      const item = state.items.find(
        (i) => i.id === action.payload.id
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
