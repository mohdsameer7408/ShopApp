import { createSlice } from "@reduxjs/toolkit";
import axios from "./axios";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
// import PRODUCTS from "../data/dummyData";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    availableProducts: [],
    userProducts: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.availableProducts = action.payload.products;
      state.userProducts = action.payload.userProducts;
    },
    createProduct: (state, action) => {
      state.availableProducts = [action.payload, ...state.availableProducts];
      state.userProducts = [action.payload, ...state.userProducts];
    },
    updateProduct: (state, action) => {
      state.availableProducts = state.availableProducts.map((product) =>
        product.id === action.payload.id
          ? { ...action.payload, price: product.price }
          : product
      );
      state.userProducts = state.userProducts.map((product) =>
        product.id === action.payload.id
          ? { ...action.payload, price: product.price }
          : product
      );
    },
    deleteProduct: (state, action) => {
      state.userProducts = state.userProducts.filter(
        (product) => product.id !== action.payload.id
      );
      state.availableProducts = state.availableProducts.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});

export const {
  setProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = productsSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const setProductsAsync = () => async (dispatch, getState) => {
  const { userId } = getState().auth;

  try {
    const response = await axios.get("/products.json/");
    const data = response.data;

    if (response.status !== 200) {
      throw new Error("Something went wrong!");
    }
    const products = [];
    for (let key in data) {
      products.push({
        id: key,
        title: data[key].title,
        price: data[key].price,
        imageUrl: data[key].imageUrl,
        description: data[key].description,
        ownerId: data[key].ownerId,
        ownerPushToken: data[key].ownerPushToken,
      });
    }
    const userProducts = products.filter(
      (product) => product.ownerId === userId
    );
    dispatch(setProducts({ products, userProducts }));
  } catch (error) {
    throw error;
  }
};

export const createProductAsync = (product) => async (dispatch, getState) => {
  const { token, userId } = getState().auth;

  let status = (await Permissions.getAsync(Permissions.NOTIFICATIONS)).status;
  let pushToken;

  if (status !== "granted") {
    status = (await Permissions.askAsync(Permissions.NOTIFICATIONS)).status;
    if (status !== "granted") {
      pushToken = null;
    }
  }

  if (status === "granted") {
    pushToken = (await Notifications.getExpoPushTokenAsync()).data;
  }

  try {
    const { data, status } = await axios.post(`/products.json?auth=${token}`, {
      ...product,
      ownerId: userId,
      ownerPushToken: pushToken,
    });
    if (status !== 200) {
      throw new Error("Something went wrong!");
    }
    dispatch(
      createProduct({
        id: data.name,
        ...product,
        ownerId: userId,
        ownerPushToken: pushToken,
      })
    );
  } catch (error) {
    throw error;
  }
};

export const updateProductAsync = (product) => async (dispatch, getState) => {
  const { token } = getState().auth;
  try {
    const { status } = await axios.patch(
      `/products/${product.id}.json?auth=${token}`,
      product
    );
    if (status !== 200) {
      throw new Error("Something went wrong!");
    }
    dispatch(updateProduct(product));
  } catch (error) {
    throw error;
  }
};

export const deleteProductAsync = (product) => async (dispatch, getState) => {
  const { token } = getState().auth;
  try {
    const { status } = await axios.delete(
      `/products/${product.id}.json?auth=${token}`
    );
    if (status !== 200) {
      throw new Error("Something went wrong!");
    }
    dispatch(deleteProduct(product));
  } catch (error) {
    throw error;
  }
};

export const selectAvailableProducts = (state) =>
  state.products.availableProducts;
export const selectUserProducts = (state) => state.products.userProducts;

export default productsSlice.reducer;
