import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { RootState } from "../redux/rootReducer";
import { AuthApp } from "./Auth/AuthApp";
import { AuthPage } from "./Auth/Authpage";
import { AuthHelper } from "./Auth/helpers/authHelper";
import { ErrorPage } from "./Errors/ErrorPage";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";

const AppRoutes = () => {
  const isAuthorized = AuthHelper();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthApp />}>
          <Route path="error/*" element={<ErrorPage />} />
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
