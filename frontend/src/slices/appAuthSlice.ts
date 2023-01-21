import { createSlice } from "@reduxjs/toolkit";
import { AppUserModel } from "../models/models";

interface AuthModel {
  user: AppUserModel | undefined;
  accessToken: string | undefined;
}

const initialAuthState: AuthModel = {
  user: undefined,
  accessToken: undefined,
};

const appAuthSlice = createSlice({
  name: "appAuthSlice",
  initialState: initialAuthState,
  reducers: {
    setAppUser(
      state: AuthModel,
      action: { payload: { user: AppUserModel | undefined } }
    ) {
      state.user = action.payload.user;
    },
    setToken(
      state: AuthModel,
      action: { payload: { token: string | undefined } }
    ) {
      state.accessToken = action.payload.token;
    },
  },
});

export const { setAppUser,setToken } = appAuthSlice.actions;

export default appAuthSlice.reducer;
