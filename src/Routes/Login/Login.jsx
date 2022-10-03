import React from "react";
import { Link } from "react-router-dom";
import { Field, FormikProvider, useFormik } from "formik";
import { env } from "../../config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      usertype: "",
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
        let loginData = await axios.post(`${env.api}/login`, values);

        if (loginData.status === 200) {
          window.localStorage.setItem("app-token", loginData.data.token);
          if (loginData.data.type === "Admin") navigate("/adminhome");
          if (loginData.data.type === "User") navigate("/home");
        }
      } catch (error) {
        alert(
          `Error Code: ${error.response.status}- ${error.response.data.message}`
        );
      }
    },
  });
  return (
    <div className="container-fluid h-custom2">
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
            Greetings From Pizza Lair
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
              </div>

              <div className="form-outline mb-3">
                <label className="form-label text-white fw-bold fs-3">
                  Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  name="password"
                />
                <span className="fw-bold" style={{ color: "orange" }}>
                  {formik.errors.password}
                </span>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/forpass" className="fw-bold fs-4 mt-2  text-white">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <Field type="radio" name="usertype" value="Admin" />
              <label className="form-label mx-2 text-white  fw-bold fs-5">
                Admin
              </label>
              <Field type="radio" name="usertype" value="User" required />
              <label className="form-label mx-2 text-white  fw-bold fs-5">
                User
              </label>

              <div className="text-center text-lg-start mt-3 pt-2">
                <input
                  type={"submit"}
                  value="Sign in"
                  className="btn btn-warning btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                />

                <p
                  className="small fw-bold mt-2 pt-1 mb-0"
                  style={{ color: "#F9F9C5" }}
                >
                  New here?
                  <Link
                    to="/signup"
                    className="link-warning ms-1 text-white fw-bold"
                  >
                    Sign Up Here
                  </Link>
                </p>
              </div>
            </form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
}

export default Login;
