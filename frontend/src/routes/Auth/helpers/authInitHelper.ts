import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { AppUserModel } from "../../../models/models";
import { setAppUser } from "../../../slices/appAuthSlice";

export const authInitHelper = async (
  token: string,
  dispatch: Dispatch<AnyAction>
) => {
  let respObj = {
    errorMessage: "",
    error: false,
    data: {} as any,
  };
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    let resp = await axios.post(
      "http://localhost:3333/api/protected/profile",
      {},
      {
        headers,
      }
    );
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
