import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [
      { title: "Item de teste", price: 200, quantity: 4 },
      { title: "Item de teste 2", price: 14, quantity: 2 },
    ],
  },
  reducers: {
    addItem(state, action) {
      const existingItem = state.items.findIndex(
        (item) => item.title === action.payload.title
      );

      if (existingItem >= 0) {
        state.items[existingItem].quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem(state, action) {
      const existingItem = state.items.findIndex(
        (item) => item.title === action.payload
      );

      if (state.items[existingItem].quantity === 1) {
        state.items = state.items.filter(
          (item) => item.title !== action.payload
        );
      } else {
        state.items[existingItem].quantity--;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
