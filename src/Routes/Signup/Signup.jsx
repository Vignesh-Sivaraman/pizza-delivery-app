import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { env } from "../../config/config";
import axios from "axios";

function Signup() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};
      for (let keys in values) {
        if (values[keys] === "") {
          errors[keys] = `Please Enter ${keys}`;
        }
      }
      return errors;
    },
    onSubmit: async (values) => {
      let user = await axios.post(`${env.api}/register`, values);
      if (user.status === 200) {
        alert("Registered");
      } else {
        alert("some Error");
      }
    },
  });
  let navigate = useNavigate();

  let login = () => {
    navigate("/portal/Dashboard");
  };

  return (
    <div className="">
      <div className="container-fluid h-custom mt-5  ">
        <div className="row d-flex justify-content-center align-items-center h-100 ">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <div className="row container text-center">
              <div className="col-12">
                <h1 style={{ fontSize: "85px" }}>Pizza Lair</h1>
              </div>
              <div className="col-12">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  className="img-fluid"
                  alt="Sample image"
                />
              </div>
            </div>
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label">Email address</label>
                <input
                  className="form-control"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  name="email"
                />
                <span style={{ color: "red" }}>{formik.errors.email}</span>
              </div>

              <div className="form-outline mb-3">
                <label className="form-label">Password</label>
                <input
                  className="form-control"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  name="password"
                />
                <span style={{ color: "red" }}>{formik.errors.password}</span>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <input
                  type={"submit"}
                  value="Signup"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
