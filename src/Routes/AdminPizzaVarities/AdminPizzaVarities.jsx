import React from "react";
import { useNavigate } from "react-router-dom";
import AdminPizzaCard from "../../Components/AdminPizzaCard/AdminPizzaCard";

const AdminPizzaVarities = () => {
  let navigate = useNavigate();
  const pizzas = [
    {
      id: 1,
      pizza_name: "MARGHERITA",
      pizza_uri: "https://www.dominos.co.in/files/items/Margherit.jpg",
      pizza_price: 299,
    },
    {
      id: 2,
      pizza_name: "FARM HOUSE",
      pizza_uri: "https://www.dominos.co.in/files/items/Farmhouse.jpg",
      pizza_price: 399,
    },
    {
      id: 3,
      pizza_name: "VEG EXTRAVAGANZA",
      pizza_uri: "https://www.dominos.co.in/files/items/Veg_Extravaganz.jpg",
      pizza_price: 499,
    },
    {
      id: 4,
      pizza_name: "CHICKEN DOMINATOR",
      pizza_uri:
        "https://www.dominos.co.in/files/items/MicrosoftTeams-image_(11).png",
      pizza_price: 599,
    },
    {
      id: 5,
      pizza_name: "CHICKEN FIESTA",
      pizza_uri:
        "https://www.dominos.co.in/files/items/MicrosoftTeams-image_(10).png",
      pizza_price: 699,
    },
    {
      id: 6,
      pizza_name: "CHICKEN PEPPERONI",
      pizza_uri:
        "https://www.dominos.co.in/files/items/MicrosoftTeams-image_(20).png",
      pizza_price: 799,
    },
  ];
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
          onClick={() => navigate("/adminhome")}
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
