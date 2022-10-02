import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Field, FormikProvider, useFormik } from "formik";
import { env } from "../../config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  let [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
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
      try {
        setIsLoading(true);
        let loginData = await axios.post(`${env.api}/forpass`, values);

        if (loginData.status === 200) {
          alert(loginData.data.message);
        }
        setIsLoading(false);
      } catch (error) {
        alert(
          `Error Code: ${error.response.status}- ${error.response.data.message}`
        );
      }
    },
  });
  return (
    <div className="container-fluid h-custom2">
      {isLoading ? (
        <div
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Loading...
        </div>
      ) : (
        ""
      )}
      <div
        className="row d-flex justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <div className="col-lg-4">
          <h1
            className="text-white mb-4"
            style={{
              fontSize: "50px",
              fontFamily: "pacifico",
            }}
          >
            Please enter your email id
          </h1>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label text-white fw-bold fs-3">
                  Email address
                </label>
                <input
                  className="form-control"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  name="email"
                />
                <span className="fw-bold" style={{ color: "orange" }}>
                  {formik.errors.email}
                </span>
                <div className="text-center text-lg-start mt-3 pt-2">
                  <input
                    type={"submit"}
                    value="submit"
                    className="btn btn-warning btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  />
                </div>
              </div>
            </form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
