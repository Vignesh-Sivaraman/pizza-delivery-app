import React from "react";

const PizzaCard = ({ pizza, addToCart }) => {
  return (
    <div className="col-lg-3 col-12">
      <div className="card mb-5 mx-auto" style={{ width: "18rem" }}>
        <img
          width="268px"
          height="286px"
          src={pizza.pizza_uri}
          className="card-img-top"
          alt={pizza.pizza_name}
        />
        <div className="card-body">
          <h5 className="card-title text-center mt-3 mb-4">
            {pizza.pizza_name}
          </h5>
          <button className=" btn btn-outline-primary ms-3 me-3 d-inline fw-bold">
            Rs. {pizza.pizza_price}/-
          </button>

          <button
            onClick={() => addToCart(pizza)}
            className="btn btn-primary ms-3 d-inline"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
