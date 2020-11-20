import { createSlice } from "@reduxjs/toolkit";
import authAxios, { apiKey } from "./authAxios";
import AsyncStorage from "@react-native-community/async-storage";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userId: null,
    email: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
    },
    signUp: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
    },
    logout: (state) => {
      clearLogoutTimer();
      AsyncStorage.removeItem("userData");
      state.token = null;
      state.userId = null;
      state.email = null;
    },
  },
});

export const { login, signUp, logout } = authSlice.actions;

export const signUpAsync = (user) => async (dispatch) => {
  try {
    const { data, status } = await authAxios.post(
      `/accounts:signUp?key=${apiKey}`,
      {
        ...user,
        returnSecureToken: true,
      }
    );

    if (status !== 200) {
      const errorId = data.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message =
          "This email is already registered to an account, Try signing in!";
      }
      throw new Error(message);
    }

    const userData = {
      token: data.idToken,
      userId: data.localId,
      email: data.email,
    };

    dispatch(signUp(userData));
    const expirationDate = new Date(
      new Date().getTime() + parseInt(data.expiresIn) * 1000
    ).toISOString();

    dispatch(setLogoutTimer(parseInt(data.expiresIn) * 1000));
    saveToAsyncStorage({ ...userData, expirationDate });
  } catch (error) {
    throw error;
  }
};

export const signInAsync = (user) => async (dispatch) => {
  try {
    const { data, status } = await authAxios.post(
      `/accounts:signInWithPassword?key=${apiKey}`,
      {
        ...user,
        returnSecureToken: true,
      }
    );

    if (status !== 200) {
      const errorId = data.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }
      throw new Error(message);
    }

    const userData = {
      token: data.idToken,
      userId: data.localId,
      email: data.email,
    };

    dispatch(login(userData));
    const expirationDate = new Date(
      new Date().getTime() + parseInt(data.expiresIn) * 1000
    ).toISOString();

    dispatch(setLogoutTimer(parseInt(data.expiresIn) * 1000));
    saveToAsyncStorage({ ...userData, expirationDate });
  } catch (error) {
    throw error;
  }
};

let timer;

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

export const setLogoutTimer = (expirationTime) => (dispatch) => {
  timer = setTimeout(() => {
    dispatch(logout());
  }, expirationTime);
};

const saveToAsyncStorage = async (userData) => {
  try {
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
  } catch (error) {
    console.log(error);
  }
};

export const selectUserToken = (state) => state.auth.token;
export const selectUserId = (state) => state.auth.userId;
export const selectUserEmail = (state) => state.auth.email;

export default authSlice.reducer;
