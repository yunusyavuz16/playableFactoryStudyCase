import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { SET_TOKEN_LOCAL_STORAGE } from "../../../localStorage/localStorage";
import { AppUserModel } from "../../../models/models";
import { setAppUser, setToken } from "../../../slices/appAuthSlice";

export const login = async (
  email: string,
  password: string,
  dispatch: Dispatch<AnyAction>
) => {
  let respObj = {
    errorMessage: "",
    error: false,
    data: {} as any,
  };

  try {
    let resp = await axios.post("http://localhost:3333/api/auth/login", {
      email,
      password,
    });
    if (resp.status === 200) {
      console.log("resp", resp);
      respObj.data = resp.data;
      respObj.error = false;
      const userObj: AppUserModel = {
        email: resp.data.email,
        userName: resp.data.userName,
        userGuid: resp.data.guid,
      };
      dispatch(setAppUser({ user: userObj }));
      dispatch(setToken({ token: resp.data.token }));
      SET_TOKEN_LOCAL_STORAGE(resp.data.token);
    } else {
      let mockRes: any = resp;
      respObj.error = true;
      respObj.errorMessage = mockRes?.response?.message;
      respObj.data = mockRes?.response?.data;
    }
  } catch (error) {
    respObj.error = true;
    respObj.errorMessage = JSON.stringify(error);
  }
  return respObj;
};
