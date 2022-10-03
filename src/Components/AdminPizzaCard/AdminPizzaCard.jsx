import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPizzaCard = () => {
  let navigate = useNavigate();
  return (
    <div className="col-lg-3 col-12">
      <div className="card mb-5 mx-auto text-center" style={{ width: "18rem" }}>
        <img
          src="https://www.dominos.co.in/files/items/Margherit.jpg"
          className="card-img-top"
          alt="pizza_name"
        />
        <div className="card-body">
          <h4 className="card-title text-center mt-3 mb-4">pizza_name</h4>
          <h5 className="card-title text-center mt-3 mb-4">Price</h5>

          <button
            className="btn btn-primary ms-3 d-inline"
            onClick={() => navigate("/adminhome/adminpizzadetails")}
          >
            More details
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPizzaCard;
