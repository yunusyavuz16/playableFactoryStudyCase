import React, { useRef, useEffect, useState } from "react";
import { shallowEqual, useSelector, connect, useDispatch } from "react-redux";
import { GET_TOKEN_LOCAL_STORAGE } from "../../localStorage/localStorage";
import { RootState } from "../../redux/rootReducer";
import { setAppUser } from "../../slices/appAuthSlice";
import { authInitHelper } from "./helpers/authInitHelper";

const AuthInit = (props: any) => {
  const didRequest = useRef(false);
  const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const accessToken = GET_TOKEN_LOCAL_STORAGE();

  // We should request user by authToken before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        await authInitHelper(accessToken!, dispatch);
      } catch (error) {
        console.error(error);
        dispatch(setAppUser({ user: undefined }));
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true);
    };

    if (accessToken) {
      requestUser();
    } else {
      dispatch(setAppUser({ user: undefined }));
      setShowSplashScreen(false);
    }
  }, []);

  return <>{props.children}</>;
};

export default AuthInit;
