import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";

const Navbar = () => {
  let context = useContext(UserContext);
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-primary container-fluid"
      style={{ position: "fixed", zIndex: 1000 }}
    >
      <Link to="/home" className="navbar-brand fw-bold ms-2  text-white">
        Pizza Lair
      </Link>
      <div className="nav-link text-white ms-2 ">Click for Custom Pizza </div>

      <Link
        to="/home/cart"
        className="btn d-block btn-primary bg-white text-primary fw-bold ms-auto me-2 cart-button "
        style={{ position: "relative" }}
      >
        <span className="fs-4">Cart</span>
        <FontAwesomeIcon className="mx-1" icon="cart-shopping" size="2x" />
        <span
          style={{
            position: "absolute",
            width: 25,
            height: 25,
            background: "rgb(220, 53, 69)",
            borderRadius: "50%",
            color: "#ffffff",
            top: 0,
            right: 5,
          }}
        >
          {context.count}
        </span>
      </Link>
    </nav>
  );
};

export default Navbar;
