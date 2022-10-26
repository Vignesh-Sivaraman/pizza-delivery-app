import React from "react";
import PizzaCard from "../../Components/Pizzacard/PizzaCard";
import UserContext from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { env } from "../../config/config";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  let [pizzas, setPizzas] = useState([]);
  let { count, setCount, upizzas, setUpizzas } = useContext(UserContext);
  let navigate = useNavigate();

  const getpizzas = async () => {
    let pizzadata = await axios.get(`${env.api}/pizzas`, {
      headers: {
        Authorization: window.localStorage.getItem("app-token"),
      },
    });
    setPizzas(pizzadata.data);
  };

  useEffect(() => {
    if (!window.localStorage.getItem("app-token")) {
      alert("Please Login");
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getpizzas();
    setCount(JSON.parse(window.localStorage.getItem("cart-count")));
  }, []);

  const addToCart = async (pizza) => {
    let oldcart = JSON.parse(window.localStorage.getItem("cart-items"));
    oldcart.push(pizza);
    window.localStorage.setItem("cart-items", JSON.stringify(oldcart));
    let newTotal =
      parseInt(window.localStorage.getItem("cart-total")) +
      parseInt(pizza.pizza_price);
    window.localStorage.setItem("cart-total", newTotal);
    let new_count = parseInt(window.localStorage.getItem("cart-count")) + 1;
    window.localStorage.setItem("cart-count", new_count);
    setCount(new_count);
    setUpizzas(oldcart);
  };
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
      <div className="row">
        {pizzas.map((pizza, i) => {
          return <PizzaCard pizza={pizza} key={i} addToCart={addToCart} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
