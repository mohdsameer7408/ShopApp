import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, price } = action.payload;
      const doesItemExists = state.items.some((item) => item.id === id);
      if (doesItemExists) {
        state.items = state.items.map((item) =>
          item.id === id
            ? { ...item, qty: item.qty + 1, sum: item.sum + price }
            : item
        );
      } else {
        state.items = [
          ...state.items,
          { ...action.payload, qty: 1, sum: price },
        ];
      }
      state.totalAmount = state.totalAmount + price;
    },
    removeFromCart: (state, action) => {
      const { id, qty, price } = action.payload;
      if (qty === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        state.items = state.items.map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1, sum: item.sum - price }
            : item
        );
      }
      state.totalAmount = Math.abs(state.totalAmount - price);
    },
    emptyCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
    removeDeletedProduct: (state, action) => {
      const productToRemove = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (productToRemove) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.totalAmount = state.totalAmount - productToRemove.sum;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  emptyCart,
  removeDeletedProduct,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartAmount = (state) => state.cart.totalAmount;

export default cartSlice.reducer;

// reducer logic with object
// addToCart: (state, action) => {
//       const { id, title, price } = action.payload;
//       let cartItem;
//       if (state.items[id]) {
//         const { qty, sum } = state.items[id];
//         cartItem = { ...state.items[id], qty: qty + 1, sum: sum + price };
//       } else {
//         cartItem = { title, price, qty: 1, sum: price };
//       }
//       state.items = {
//         ...state.items,
//         [id]: cartItem,
//       };
//       state.totalAmount = state.totalAmount + price;
//     },
