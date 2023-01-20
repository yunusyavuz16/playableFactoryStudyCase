import React, { useEffect } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import PageFooter from "../../layout/PageFooter";
import PageHeader from "../../layout/PageHeader";
import Login from "./Login";
import "./style.css";

export function AuthPage() {
  useEffect(() => {
    document.body.classList.add("bg-white");
    return () => {
      document.body.classList.remove("bg-white");
    };
  }, []);

  return (
    <div style={{ height: "100vh", background: "#c8dfff" }}>
      <PageHeader />
      <LocaleLoginComponent />
      <PageFooter />
    </div>
  );
}

const LocaleLoginComponent = () => {
  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center border-none border-radius radius-10 rounded h-75 ">
      <div
        className="mx-auto p-5 card rounded-3 shadow w-75"
        style={{ maxWidth: 475 }}
      >
        <Routes>
          <Route element={<Outlet />}>
            <Route path="login" element={<Login />} />
            <Route index element={<Login />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};
