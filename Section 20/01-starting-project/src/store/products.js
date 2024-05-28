import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [
      {
        title: "Notebook",
        price: 7.99,
        quantity: 5,
        description:
          "Best notebook of all notebooks to keep you up with yr notes.",
      },
      {
        title: "Pen",
        price: 1.99,
        quantity: 3,
        description:
          "Super pen, there has never been a better pen like this pen in the WHOLE world!!!!",
      },
    ],
  },
  reducers: {},
});

export default productsSlice.reducer;
