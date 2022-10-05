import React from "react";
import { Field, FormikProvider, useFormik } from "formik";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { env } from "../../config/config";

const AdminCreatePizza = () => {
  let navigate = useNavigate();
  let bases = ["Thin", "Thick", "Flat", "Cracker", "Stuffed"];
  let sauces = ["Pesto", "Hummus", "Garlic", "Jalepeno", "Barbeque"];
  let cheeses = ["Asiago", "Blue", "Bocconcini", "Brie"];
  let veggies = ["Olives", "Pepper", "Tomato", "Zucchini", "Eggplant"];
  let meats = ["Chicken", "Prawn", "Lamb", "Ham", "Bacon"];

  const formik = useFormik({
    initialValues: {
      pizza_name: "",
      pizza_price: Number(""),
      pizza_uri: "",
      pizza_base: "",
      pizza_sauce: "",
      pizza_cheese: "",
      pizza_veggie: [],
      pizza_meat: [],
    },
    validate: (values) => {
      let errors = {};
      for (let keys in values) {
        if (values[keys] === "" || values[keys].length === 0) {
          if (keys === "pizza_veggie" || keys === "pizza_meat") continue;
          else errors[keys] = `Please Enter ${keys}`;
        }
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        if (!window.localStorage.getItem("app-token")) {
          alert("Please Login");
          navigate("/");
          console.log(values);
        } else {
          let sentData = await axios.post(`${env.api}/pizzas`, values, {
            headers: {
              Authorization: window.localStorage.getItem("app-token"),
            },
          });
          if (sentData.status === 200) {
            alert(sentData.data.message);

            navigate("/adminhome/adminpizzavarities");
          }
        }
      } catch (error) {
        alert(
          `Error Code: ${error.response.status}- ${error.response.data.message}`
        );
      }
    },
  });
  return (
    <div
      className="container mx-auto"
      style={{
        position: "relative",
        top: "92px",
        overflow: "hidden",
        height: "auto",
        width: "100%",
      }}
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className="row" style={{ height: "100%" }}>
            <div className="form-outline mb-4">
              <label className="form-label fw-bold fs-4 text-dark">Name</label>
              <input
                className="form-control"
                type="text"
                value={formik.values.pizza_name}
                onChange={formik.handleChange}
                name="pizza_name"
              />
              <span className="fw-bold" style={{ color: "red" }}>
                {formik.errors.pizza_name}
              </span>
            </div>

            <div className="form-outline mb-3">
              <label className="form-label text-dark fw-bold fs-4">Price</label>
              <input
                className="form-control"
                type="text"
                value={formik.values.pizza_price}
                onChange={formik.handleChange}
                name="pizza_price"
              />
              <span className="fw-bold" style={{ color: "red" }}>
                {formik.errors.pizza_price}
              </span>
            </div>

            <div className="form-outline mb-3">
              <label className="form-label text-dark fw-bold fs-4">
                Image_URI
              </label>
              <input
                className="form-control"
                type="text"
                value={formik.values.pizza_uri}
                onChange={formik.handleChange}
                name="pizza_uri"
              />
              <span className="fw-bold" style={{ color: "red" }}>
                {formik.errors.pizza_uri}
              </span>
            </div>
            <div className="my-2">
              <span className="fw-bold fs-3" style={{ color: "#F94892" }}>
                Ingredients:
              </span>
            </div>
            <div className="my-2">
              <span className=" fs-5 text-primary">Pizzabase:</span>
            </div>
            {bases.map((base, i) => {
              return (
                <div className="col-lg-2" key={i}>
                  <input
                    onChange={formik.handleChange}
                    type="radio"
                    value={base}
                    name="pizza_base"
                  />
                  <label>{base}</label>
                </div>
              );
            })}
            <span className="fw-bold mt-2" style={{ color: "red" }}>
              {formik.errors.pizza_base}
            </span>
            <div className="my-2">
              <span className=" fs-5 text-primary">Sauce:</span>
            </div>
            {sauces.map((sauce, i) => {
              return (
                <div className="col-lg-2" key={i}>
                  <input
                    onChange={formik.handleChange}
                    type="radio"
                    value={sauce}
                    name="pizza_sauce"
                  />
                  <label>{sauce}</label>
                </div>
              );
            })}
            <span className="fw-bold  mt-2" style={{ color: "red" }}>
              {formik.errors.pizza_sauce}
            </span>
            <div className="my-2">
              <span className=" fs-5 text-primary">Cheese:</span>
            </div>
            {cheeses.map((cheese, i) => {
              return (
                <div className="col-lg-2" key={i}>
                  <input
                    onChange={formik.handleChange}
                    type="radio"
                    value={cheese}
                    name="pizza_cheese"
                  />
                  <label>{cheese}</label>
                </div>
              );
            })}
            <span className="fw-bold  mt-2" style={{ color: "red" }}>
              {formik.errors.pizza_cheese}
            </span>
            <div className="my-2">
              <span className=" fs-5 text-primary">Veggie:</span>
            </div>
            {veggies.map((veggie, i) => {
              return (
                <div className="col-lg-2" key={i}>
                  <input
                    onChange={formik.handleChange}
                    type="checkbox"
                    value={veggie}
                    name="pizza_veggie"
                  />
                  <label>{veggie}</label>
                </div>
              );
            })}
            <span className="fw-bold  mt-2" style={{ color: "red" }}>
              {formik.errors.pizza_veggie}
            </span>
            <div className="my-2">
              <span className=" fs-5 text-primary">Meat:</span>
            </div>
            {meats.map((meat, i) => {
              return (
                <div className="col-lg-2" key={i}>
                  <input
                    onChange={formik.handleChange}
                    type="checkbox"
                    value={meat}
                    name="pizza_meat"
                  />
                  <label>{meat}</label>
                </div>
              );
            })}
            <span className="fw-bold  mt-2" style={{ color: "red" }}>
              {formik.errors.pizza_meat}
            </span>

            <div className="text-center text-lg-start my-2 pt-2">
              <input
                type={"submit"}
                value="Add Pizza"
                className="btn btn-warning btn-lg"
                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
              />
            </div>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
};

export default AdminCreatePizza;
