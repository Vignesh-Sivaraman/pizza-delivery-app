import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPizzaCard = ({ pizza }) => {
  let navigate = useNavigate();
  return (
    <div className="col-lg-3 col-12">
      <div className="card mb-5 mx-auto text-center" style={{ width: "18rem" }}>
        <img
          width="268px"
          height="286px"
          src={pizza.pizza_uri}
          className="card-img-top"
          alt={pizza.pizza_name}
        />
        <div className="card-body">
          <h4 className="card-title text-center mt-3 mb-4">
            {pizza.pizza_name}
          </h4>
          <h5 className="card-title text-center mt-3 mb-4">
            Rs. {pizza.pizza_price}/-
          </h5>

          <button
            className="btn btn-primary ms-3 d-inline"
            onClick={() =>
              navigate(`/adminhome/adminpizzadetails/${pizza._id}`)
            }
          >
            More details
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPizzaCard;
