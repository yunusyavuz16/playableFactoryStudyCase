import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const PrivateRoutes = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        {/* <DefaultLayout /> */}
        <Route element={<div></div>}>
          <Route path="auth/*" element={<Navigate to="/dashboard" />} />
          {/* <Route path="dashboard" element={<Dashboard />} />
          <Route path="application-list" element={<ApplicationList />} />
          <Route path="new-app-form" element={<NewForm />} /> */}

          <Route path="*" element={<Navigate to="/error/404" />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
