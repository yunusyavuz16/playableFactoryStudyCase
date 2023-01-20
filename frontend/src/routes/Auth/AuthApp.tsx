import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AuthInit from "./AuthInit";

const AuthApp = () => {
  return (
    <Suspense fallback={<React.Fragment></React.Fragment>}>
      <AuthInit>
        <Outlet />
      </AuthInit>
    </Suspense>
  );
};

export { AuthApp };
