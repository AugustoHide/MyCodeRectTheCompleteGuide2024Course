import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart";
import products from "./products";
import uiSlice from "./uiSlice";

const store = configureStore({
  reducer: { cart: cartSlice, products: products, ui: uiSlice },
});

export default store;
