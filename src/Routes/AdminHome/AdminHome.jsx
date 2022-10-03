import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "../../Components/AdminNavbar/AdminNav";

const AdminHome = () => {
  return (
    <>
      <AdminNav></AdminNav>
      <Outlet />
    </>
  );
};

export default AdminHome;
