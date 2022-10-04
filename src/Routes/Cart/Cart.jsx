import React from "react";
import Cartcard from "../../Components/Cartcard/Cartcard";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";

const Cart = () => {
  let { count, setCount, upizzas, setUpizzas } = useContext(UserContext);

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
    // window.location.reload();
    // let new_total = context.total - pizza.pizza_price;
    // context.setTotal(new_total);
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
      <h1 style={{ color: "#0d6efd" }}>Your Cart</h1>
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
        <button className="btn btn-success fs-3 fw-bold my-3">
          Proceed to Check out:
          <span className="mx-2">
            Rs. {parseInt(window.localStorage.getItem("cart-total"))}/-
          </span>
        </button>
      </div>
    </div>
  );
};

export default Cart;
