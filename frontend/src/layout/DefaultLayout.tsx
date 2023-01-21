import React from "react";
import { Outlet } from "react-router-dom";
import PageFooter from "./PageFooter";
import PageHeader from "./PageHeader";
import '../routes/Auth/style.css'

const DefaultLayout = () => {
  return (
    <div className=" containerHeight customBgColor" >
      <PageHeader />
      <Outlet />
      <PageFooter />
    </div>
  );
};

export default DefaultLayout;
