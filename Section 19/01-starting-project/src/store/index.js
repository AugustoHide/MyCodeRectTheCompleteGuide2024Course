import { configureStore } from "@reduxjs/toolkit";
import counterSliceReducer from "./counter";
import autheticationSliceReducer from "./auth";

const store = configureStore({
  reducer: { counter: counterSliceReducer, auth: autheticationSliceReducer },
});

export default store;
