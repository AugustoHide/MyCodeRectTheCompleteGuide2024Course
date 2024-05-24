import { createSlice } from "@reduxjs/toolkit";
const initialAuthState = { isAuthenticated: false };

const autheticationSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, payload) {
      console.log(payload.payload.email, "in jindex of redux");
      //authentication code to be put
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});
export const authenticationActions = autheticationSlice.actions;

export default autheticationSlice.reducer;
