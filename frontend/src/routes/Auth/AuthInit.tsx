import React, { useRef, useEffect, useState } from "react";
import { shallowEqual, useSelector, connect, useDispatch } from "react-redux";
import { RootState } from "../../redux/rootReducer";



 const AuthInit = (props : any) => {

  const didRequest = useRef(false);
  const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const accessToken = useSelector(
    (state: RootState) => state.appAuth,
    shallowEqual
  );

  // We should request user by authToken before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
        }
      } catch (error) {
        console.error(error);
        if (!didRequest.current) {
          dispatch(props.logout());
        }
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true);
    };

    if (accessToken) {
      requestUser();
    } else {
      dispatch(props.logout());
      setShowSplashScreen(false);
    }
  }, []);

  return <>{props.children}</>;
};

export default AuthInit;
