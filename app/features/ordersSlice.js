import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import moment from "moment";
import axios from "./axios";

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    addAnOrder: (state, action) => {
      state.orders = [action.payload, ...state.orders];
    },
  },
});

export const { addAnOrder, setOrders } = ordersSlice.actions;

export const setOrdersAsync = () => async (dispatch, getState) => {
  const { userId } = getState().auth;
  try {
    const { data, status } = await axios.get(`/orders/${userId}.json/`);

    if (status !== 200) {
      throw new Error("Something went wrong!");
    }

    let orders = [];
    for (let key in data) {
      orders.push({
        id: key,
        cartItems: data[key].cartItems,
        totalAmount: data[key].totalAmount,
        date: data[key].date,
      });
    }
    dispatch(setOrders(orders.reverse()));
  } catch (error) {
    throw error;
  }
};

export const addAnOrderAsync = (order) => async (dispatch, getState) => {
  const { token, userId, email } = getState().auth;
  try {
    const date = moment(new Date()).format("MMMM Do YYYY, hh:mm");
    const { data, status } = await axios.post(
      `/orders/${userId}.json?auth=${token}`,
      {
        ...order,
        date,
      }
    );

    if (status !== 200) {
      throw new Error("Something went wrong!");
    }

    dispatch(addAnOrder({ id: data.name, ...order, date }));

    for (let cartItem of order.cartItems) {
      const { title, ownerPushToken } = cartItem;
      Axios.post(
        "https://exp.host/--/api/v2/push/send",
        {
          to: ownerPushToken,
          title,
          body: `Placed by ${email.split("@", 1)[0].toUpperCase()}`,
        },
        { headers: { "Accept-Encoding": "gzip, deflate" } }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const selectOrders = (state) => state.orders.orders;

export default ordersSlice.reducer;

// old date format
// new Date().toLocaleDateString("en-EN", {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
