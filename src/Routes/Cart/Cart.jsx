import React from "react";
import Cartcard from "../../Components/Cartcard/Cartcard";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";

const Cart = () => {
  let context = useContext(UserContext);
  const pizzas = context.cartItem;
  const removeFromCart = (pizza) => {
    let index = pizzas.findIndex((item) => {
      return item.id === pizza.id;
    });
    let remove_item = [...pizzas];
    remove_item.splice(index, 1);
    context.setCartItem(remove_item);
    let new_count = context.count - 1;
    context.setCount(new_count);
    let new_total = context.total - pizza.pizza_price;
    context.setTotal(new_total);
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
          {pizzas.map((pizza, i) => {
            return (
              <Cartcard pizza={pizza} key={i} removeFromCart={removeFromCart} />
            );
          })}
        </div>
        <button className="btn btn-success fs-3 fw-bold my-3">
          Proceed to Check out:
          <span className="mx-2">Rs. {context.total}/-</span>
        </button>
      </div>
    </div>
  );
};

export default Cart;
