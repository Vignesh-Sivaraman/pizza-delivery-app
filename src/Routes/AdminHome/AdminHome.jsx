import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNav from "../../Components/AdminNavbar/AdminNav";

const AdminHome = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (!window.localStorage.getItem("app-token")) {
      alert("Please Login");
      navigate("/");
    }
  }, []);
  return (
    <>
      <AdminNav></AdminNav>
      <Outlet />
    </>
  );
};

export default AdminHome;
