import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import Dashboard from "../../pages/Dashboard";

const PrivateRoutes = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="auth/*" element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/error/404" />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
