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
    if (!window.localStorage.getItem("app-token")) {
      alert("Please Login");
      navigate("/");
    } else {
      let pizzadata = await axios.get(`${env.api}/pizzas`, {
        headers: {
          Authorization: window.localStorage.getItem("app-token"),
        },
      });
      setPizzas(pizzadata.data);
    }
  };

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
    // window.location.reload();

    // console.log(oldcart);
    // let additional_item = [...context.cartItem];
    // additional_item.push(pizza);
    // context.setCartItem(additional_item);
    // let new_count = context.count + 1;
    // context.setCount(new_count);
    // let new_total = parseInt(context.total) + parseInt(pizza.pizza_price);
    // context.setTotal(new_total);
    // try {
    //   let pizzadata = await axios.post(`${env.api}/cartpizzas`, pizza, {
    //     headers: {
    //       Authorization: window.localStorage.getItem("app-token"),
    //     },
    //   });
    //   if (pizzadata.status === 200) alert(pizzadata.data.message);
    // } catch (error) {
    //   alert(
    //     `Error Code: ${error.response.status}- ${error.response.data.message}`
    //   );
    // }
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
