import React, { useContext, useEffect, useState } from "react";
import { FormikProvider, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const CustomPizza = () => {
  let { count, setCount } = useContext(UserContext);
  let [show, setShow] = useState(false);
  let [details, setDetails] = useState({});
  let navigate = useNavigate();
  let bases = ["Thin", "Thick", "Flat", "Cracker", "Stuffed"];
  let sauces = ["Pesto", "Hummus", "Garlic", "Jalepeno", "Barbeque"];
  let cheeses = ["Asiago", "Blue", "Bocconcini", "Brie"];
  let veggies = ["Olives", "Pepper", "Tomato", "Zucchini", "Eggplant"];
  let meats = ["Chicken", "Prawn", "Lamb", "Ham", "Bacon"];

  useEffect(() => {
    if (!window.localStorage.getItem("app-token")) {
      alert("Please Login");
      navigate("/");
    }
  }, []);

  useEffect(() => {
    setCount(JSON.parse(window.localStorage.getItem("cart-count")));
  }, []);

  const formik = useFormik({
    initialValues: {
      pizza_name: "",
      pizza_price: Number(199),
      pizza_uri: "https://cdn-icons-png.flaticon.com/512/2094/2094661.png",
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
      // console.log(errors);
      return errors;
    },
    onSubmit: async (values) => {
      try {
        if (!window.localStorage.getItem("app-token")) {
          alert("Please Login");
          navigate("/");
        } else {
          values._id = values.pizza_name + Math.random().toString(16).slice(2);
          if (values.pizza_veggie.length > 3) {
            let customVeggiePrice =
              parseInt(values.pizza_veggie.length - 3) * 10;
            values.pizza_price = values.pizza_price + customVeggiePrice;
          }
          if (values.pizza_meat.length > 1) {
            let customMeatPrice = parseInt(values.pizza_meat.length - 1) * 50;
            values.pizza_price = values.pizza_price + customMeatPrice;
          }
          console.log(values);
          setShow(true);
          setDetails(values);
          let oldcart = JSON.parse(window.localStorage.getItem("cart-items"));
          oldcart.push(values);
          window.localStorage.setItem("cart-items", JSON.stringify(oldcart));
          let newTotal =
            parseInt(window.localStorage.getItem("cart-total")) +
            parseInt(values.pizza_price);
          window.localStorage.setItem("cart-total", newTotal);
          let new_count =
            parseInt(window.localStorage.getItem("cart-count")) + 1;
          window.localStorage.setItem("cart-count", new_count);
          setTimeout(() => {
            alert("added to cart");
            window.location.reload();
          }, 1000);
        }
      } catch (error) {
        alert(console.log(error));
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
      <h5 style={{ color: "red" }}>
        Note: The base Price of a custom Pizza is Rs. 199/-. You are free to
        choose 3 veggies and 1 meat. You will be charged an additional Rs.10 and
        Rs.50 for each veggie & meat after the free ones
      </h5>
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
                    required
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
            {show ? (
              <div className=" my-3">
                <div
                  className="card mb-1 mx-auto"
                  style={{ width: "100%", height: "auto", textAlign: "left" }}
                >
                  <div className="mx-1 my-3" style={{ position: "relative" }}>
                    <img
                      className="d-inline mx-1"
                      width="35px"
                      height="35px"
                      src={details.pizza_uri}
                      alt={details.pizza_name}
                    />
                    <span className="fw-bold mx-1" style={{ fontSize: "15px" }}>
                      {details.pizza_name}
                    </span>
                    <div className="fw-bold mx-2" style={{ fontSize: "15px" }}>
                      <span
                        className="mx-2"
                        style={{ color: "Blue", fontWeight: "bold" }}
                      >
                        Chosen Veggies:
                      </span>
                      {details.pizza_veggie.join(",")}
                    </div>
                    <div className="fw-bold mx-2" style={{ fontSize: "15px" }}>
                      <span
                        className="mx-2"
                        style={{ color: "Blue", fontWeight: "bold" }}
                      >
                        Chosen Meat:
                      </span>
                      {details.pizza_meat.join(",")}
                    </div>
                    <div className="fw-bold mx-2">
                      <span
                        className="mx-2"
                        style={{ color: "Blue", fontWeight: "bold" }}
                      >
                        Extra-Charges:
                      </span>
                      Rs. {details.pizza_price - 199}
                    </div>
                    <div className="fw-bold mx-2" style={{ fontSize: "15px" }}>
                      <span
                        className="mx-2"
                        style={{ color: "Blue", fontWeight: "bold" }}
                      >
                        Total Price:
                      </span>
                      Rs. {details.pizza_price}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="text-center text-lg-start my-2 pt-2">
              <input
                type={"submit"}
                value="Add to Cart"
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

export default CustomPizza;
