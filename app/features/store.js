import {
  configureStore,
  // applyMiddleware,
  // getDefaultMiddleware,
} from "@reduxjs/toolkit";
// import ReduxThunk from "redux-thunk";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import ordersReducer from "./ordersSlice";
import authReducer from "./authSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    auth: authReducer,
  },
  // middleware: [ReduxThunk, ...getDefaultMiddleware()],
});
