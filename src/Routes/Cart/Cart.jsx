import React from "react";
import Cartcard from "../../Components/Cartcard/Cartcard";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import Payment from "../../Components/Payment/Payment";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  let { setCount, upizzas, setUpizzas } = useContext(UserContext);
  const [message, setMessage] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("cart-total") === "0") {
      setMessage("Please add items to your Cart");
    } else {
      setMessage("Your Cart");
    }
  }, []);

  useEffect(() => {
    if (!window.localStorage.getItem("app-token")) {
      alert("Please Login");
      navigate("/");
    }
  }, []);

  useEffect(() => {
    setUpizzas(JSON.parse(window.localStorage.getItem("cart-items")));
    setCount(JSON.parse(window.localStorage.getItem("cart-count")));
  }, []);

  const removeFromCart = (pizza) => {
    let pizzas = JSON.parse(window.localStorage.getItem("cart-items"));
    let index = pizzas.findIndex((item) => {
      return item._id === pizza._id;
    });
    pizzas.splice(index, 1);
    window.localStorage.setItem("cart-items", JSON.stringify(pizzas));
    let new_count = parseInt(window.localStorage.getItem("cart-count")) - 1;
    window.localStorage.setItem("cart-count", new_count);
    let newTotal =
      parseInt(window.localStorage.getItem("cart-total")) -
      parseInt(pizza.pizza_price);
    window.localStorage.setItem("cart-total", newTotal);
    setCount(new_count);
    setUpizzas(pizzas);
  };
  return (
    <div
      className="container mx-auto"
      style={{
        position: "relative",
        top: "114px",
        height: "auto",
        width: "100%",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#0d6efd" }}>{message}</h1>
      <div
        className="container mx-auto card-box"
        style={{
          position: "relative",
          height: "100%",
          width: "50%",
          backgroundColor: "#0d6efd",
          borderRadius: "25px",
        }}
      >
        <div className="row">
          {upizzas.map((pizza, i) => {
            return (
              <Cartcard pizza={pizza} key={i} removeFromCart={removeFromCart} />
            );
          })}
        </div>
      </div>
      <div></div>
      <Payment />
    </div>
  );
};

export default Cart;
