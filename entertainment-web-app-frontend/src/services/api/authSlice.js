import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: Cookies.get("accessToken") || null, isLoading: false },
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload;
    },
    logOut: (state) => {
      state.token = null;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, logOut, setIsLoading } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAuthSate = (state) => state.auth;
