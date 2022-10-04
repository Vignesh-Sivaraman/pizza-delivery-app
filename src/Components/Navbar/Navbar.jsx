import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";

const Navbar = () => {
  let { count } = useContext(UserContext);
  let navigate = useNavigate();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-primary container-fluid"
      style={{ position: "fixed", zIndex: 1000 }}
    >
      <Link to="/home" className="navbar-brand fw-bold ms-2 fs-3  text-white">
        Pizza Lair
      </Link>
      <Link
        to="/home/custompizza"
        className="nav-link text-white ms-3 fw-bold me-1 "
      >
        Custom Pizza
      </Link>
      <h6 className=" text-white fw-bold ms-auto me-2 ">
        {window.localStorage.getItem("username")}
      </h6>

      <Link
        to="/home/cart"
        className=" text-primary fw-bold ms-2 me-2 "
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
          {count}
        </span>
      </Link>
      <button
        onClick={() => {
          window.localStorage.clear();
          navigate("/");
        }}
        className="btn d-block btn-primary bg-white text-primary fw-bold ms-2 me-2 cart-button "
        style={{ position: "relative" }}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
