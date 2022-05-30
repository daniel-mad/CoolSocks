const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProductStart: () => {},
    fetchProductsStart: () => {},
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    deleteProductStart: () => {},
  },
});

export const {
  addProductStart,
  fetchProductsStart,
  setProducts,
  deleteProductStart,
} = productsSlice.actions;
export default productsSlice.reducer;
