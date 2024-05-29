import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
    },
    addItem(state, action) {
      const existingItem = state.items.findIndex(
        (item) => item.title === action.payload.title
      );

      if (existingItem >= 0) {
        state.items[existingItem].quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.changed = true;
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

      state.changed = true;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
