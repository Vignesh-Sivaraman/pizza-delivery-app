import React from "react";
import { useNavigate } from "react-router-dom";
import AdminPizzaCard from "../../Components/AdminPizzaCard/AdminPizzaCard";
import UserContext from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import AdminPizzaDetails from "../AdminPizzaDetails/AdminPizzaDetails";
import axios from "axios";
import { env } from "../../config/config";

const AdminPizzaVarities = () => {
  let navigate = useNavigate();
  let [pizzas, setPizzas] = useState([]);

  const getApizzas = async () => {
    let pizzadata = await axios.get(`${env.api}/pizzas`, {
      headers: {
        Authorization: window.localStorage.getItem("app-token"),
      },
    });
    setPizzas(pizzadata.data);
  };

  useEffect(() => {
    getApizzas();
  }, []);

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
        {pizzas.map((pizza, i) => {
          return <AdminPizzaCard pizza={pizza} key={i} />;
        })}
      </div>
    </div>
  );
};

export default AdminPizzaVarities;
