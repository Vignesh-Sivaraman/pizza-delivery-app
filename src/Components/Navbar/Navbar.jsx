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
      <Link to="/home" className="navbar-brand fw-bold ms-2 fs-3  text-white">
        Pizza Lair
      </Link>
      <Link className="nav-link text-white ms-3 fw-bold me-1 ">
        Custom Pizza
      </Link>

      <Link
        to="/home/cart"
        className=" text-primary fw-bold ms-auto me-2 "
        style={{ position: "relative" }}
      >
        <FontAwesomeIcon
          className="mx-1"
          icon="cart-shopping"
          size="2x"
          color="white"
        />
        <span
          style={{
            textAlign: "center",
            position: "absolute",
            width: 25,
            height: 25,
            background: "rgb(220, 53, 69)",
            borderRadius: "50%",
            color: "#ffffff",
            top: -12,
            right: -6,
          }}
        >
          {context.count}
        </span>
      </Link>
      <Link
        to="/"
        className="btn d-block btn-primary bg-white text-primary fw-bold ms-2 me-2 cart-button "
        style={{ position: "relative" }}
      >
        Logout
      </Link>
    </nav>
  );
};

export default Navbar;
