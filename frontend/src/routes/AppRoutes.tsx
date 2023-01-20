import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { AuthApp } from "./Auth/AuthApp";
import { AuthPage } from "./Auth/Authpage";
import Logout from "./Auth/Logout";
import { ErrorPage } from "./Errors/ErrorPage";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";

const AppRoutes = () => {
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  //const usr = AuthService.GetCurrentUser();

  React.useEffect(() => {
    // console.log(usr);
    // if (usr && usr.token && usr.userData && usr.userData.sessionGuid) {
    //   setIsAuthorized(true);
    // }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthApp />}>
          <Route path="error/*" element={<ErrorPage />} />
          <Route path="logout" element={<Logout />} />
          {!isAuthorized ? (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          ) : (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="/dashboard" />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
