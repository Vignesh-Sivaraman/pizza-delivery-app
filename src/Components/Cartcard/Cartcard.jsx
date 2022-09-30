import React from "react";

const Cartcard = ({ pizza, removeFromCart }) => {
  return (
    <div className="col-12  my-3">
      <div
        className="card mb-1 mx-auto"
        style={{ width: "100%", height: "4rem", textAlign: "left" }}
      >
        <div className="mx-1 my-3" style={{ position: "relative" }}>
          <img
            className="d-inline mx-1"
            width="35px"
            height="35px"
            src={pizza.pizza_uri}
            alt={pizza.pizza_name}
          />
          <span className="fw-bold mx-1" style={{ fontSize: "15px" }}>
            {pizza.pizza_name}
          </span>
          <span className="fw-bold" style={{ color: "blue", fontSize: "15px" }}>
            Rs. {pizza.pizza_price}
          </span>
          <button
            onClick={() => removeFromCart(pizza)}
            style={{
              position: "absolute",
              right: "1px",
              textAlign: "center",
            }}
            className="btn btn-danger"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cartcard;
