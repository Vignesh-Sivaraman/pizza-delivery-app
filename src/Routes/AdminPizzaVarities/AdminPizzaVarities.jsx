import React from "react";
import { useNavigate } from "react-router-dom";
import AdminPizzaCard from "../../Components/AdminPizzaCard/AdminPizzaCard";
import UserContext from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import AdminPizzaDetails from "../AdminPizzaDetails/AdminPizzaDetails";

const AdminPizzaVarities = () => {
  let { cartItem } = useContext(UserContext);
  let navigate = useNavigate();
  return (
    <div
      className="container mx-auto"
      style={{
        position: "relative",
        top: "114px",
        overflow: "hidden",
        height: "auto",
        width: "100%",
      }}
    >
      <div className="text-center">
        <button
          className="btn btn-primary mb-3"
          onClick={() => navigate("/adminhome/admincreatepizza")}
        >
          Create New Variety
        </button>
      </div>

      <div className="row">
        {cartItem.map((pizza, i) => {
          return <AdminPizzaCard pizza={pizza} key={i} />;
        })}
      </div>
    </div>
  );
};

export default AdminPizzaVarities;
