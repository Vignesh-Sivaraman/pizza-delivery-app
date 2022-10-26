import React, { useEffect } from "react";
import { Field, FormikProvider, useFormik } from "formik";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { env } from "../../config/config";

const AdminAddStock = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (!window.localStorage.getItem("app-token")) {
      alert("Please Login");
      navigate("/");
    }
  }, []);

  let bases = ["Thin", "Thick", "Flat", "Cracker", "Stuffed"];
  let sauces = ["Pesto", "Hummus", "Garlic", "Jalepeno", "Barbeque"];
  let cheeses = ["Asiago", "Blue", "Bocconcini", "Brie"];
  let veggies = ["Olives", "Pepper", "Tomato", "Zucchini", "Eggplant"];
  let meats = ["Chicken", "Prawn", "Lamb", "Ham", "Bacon"];
  const formik = useFormik({
    initialValues: {
      title: "stock",
      Thin: Number(""),
      Thick: Number(""),
      Flat: Number(""),
      Cracker: Number(""),
      Stuffed: Number(""),
      Pesto: Number(""),
      Hummus: Number(""),
      Garlic: Number(""),
      Jalepeno: Number(""),
      Barbeque: Number(""),
      Asiago: Number(""),
      Blue: Number(""),
      Bocconcini: Number(""),
      Brie: Number(""),
      Olives: Number(""),
      Pepper: Number(""),
      Tomato: Number(""),
      Zucchini: Number(""),
      Eggplant: Number(""),
      Chicken: Number(""),
      Prawn: Number(""),
      Lamb: Number(""),
      Ham: Number(""),
      Bacon: Number(""),
    },
    // validate: (values) => {
    //   let errors = {};
    //   for (let keys in values) {
    //     if (values[keys] === null) {
    //       errors[keys] = `Please Enter ${keys}`;
    //     }
    //   }
    //   return errors;
    // },
    onSubmit: async (values) => {
      try {
        if (!window.localStorage.getItem("app-token")) {
          alert("Please Login");
          navigate("/");
          console.log(values);
        } else {
          let sentData = await axios.post(`${env.api}/inventory`, values, {
            headers: {
              Authorization: window.localStorage.getItem("app-token"),
            },
          });
          if (sentData.status === 200) {
            alert(sentData.data.message);
            setTimeout(() => {
              navigate("/adminhome");
            }, 1000);
          }
        }
      } catch (error) {
        alert(
          `Error Code: ${error.response.status}- ${error.response.data.message}`
        );
      }
    },
  });
  useEffect(() => {
    loadUser();
  }, []);

  let loadUser = async () => {
    try {
      let user = await axios.get(`${env.api}/inventory`, {
        headers: {
          Authorization: window.localStorage.getItem("app-token"),
        },
      });
      formik.setValues({
        title: "stock",
        Thin: user.data[0].Thin,
        Thick: user.data[0].Thick,
        Flat: user.data[0].Flat,
        Cracker: user.data[0].Cracker,
        Stuffed: user.data[0].Stuffed,
        Pesto: user.data[0].Pesto,
        Hummus: user.data[0].Hummus,
        Garlic: user.data[0].Garlic,
        Jalepeno: user.data[0].Jalepeno,
        Barbeque: user.data[0].Barbeque,
        Asiago: user.data[0].Asiago,
        Blue: user.data[0].Blue,
        Bocconcini: user.data[0].Bocconcini,
        Brie: user.data[0].Brie,
        Olives: user.data[0].Olives,
        Pepper: user.data[0].Pepper,
        Tomato: user.data[0].Tomato,
        Zucchini: user.data[0].Zucchini,
        Eggplant: user.data[0].Eggplant,
        Chicken: user.data[0].Chicken,
        Prawn: user.data[0].Prawn,
        Lamb: user.data[0].Lamb,
        Ham: user.data[0].Ham,
        Bacon: user.data[0].Bacon,
      });
    } catch (error) {
      console.error(error);
    }
  };
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
            <div className="my-2">
              <span className="fw-bold fs-3" style={{ color: "#F94892" }}>
                Stock: Minimum stock to be added
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
                    type="number"
                    value={formik.values[base]}
                    name={base}
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
                    type="number"
                    value={formik.values[sauce]}
                    name={sauce}
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
                    type="number"
                    value={formik.values[cheese]}
                    name={cheese}
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
                    type="number"
                    value={formik.values[veggie]}
                    name={veggie}
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
                    type="number"
                    value={formik.values[meat]}
                    name={meat}
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
                value="Add To Stock"
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

export default AdminAddStock;
