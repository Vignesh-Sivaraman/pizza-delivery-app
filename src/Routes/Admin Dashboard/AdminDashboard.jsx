import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { env } from "../../config/config";
import Table from "react-bootstrap/Table";

const AdminDashboard = () => {
  let navigate = useNavigate();
  let [stock, setStock] = useState({});
  let [base, setBase] = useState([]);
  let [sauce, setSauce] = useState([]);
  let [cheese, setCheese] = useState([]);
  let [veggie, setVeggie] = useState([]);
  let [meat, setMeat] = useState([]);
  // let base = [];
  // let sauce = [];
  // let cheese = [];
  // let veggie = [];
  // let meat = [];
  const getstock = async () => {
    if (!window.localStorage.getItem("app-token")) {
      alert("Please Login");
      navigate("/");
    } else {
      let stockdata = await axios.get(`${env.api}/Inventory`, {
        headers: {
          Authorization: window.localStorage.getItem("app-token"),
        },
      });

      let updatedStock = Object.assign(stockdata.data[0]);
      setStock(updatedStock);
      let updatedbase = Object.keys(stockdata.data[0]).slice(2, 7);
      setBase(updatedbase);
      let updatedsauce = Object.keys(stockdata.data[0]).slice(7, 12);
      setSauce(updatedsauce);
      let updatedcheeese = Object.keys(stockdata.data[0]).slice(12, 16);
      setCheese(updatedcheeese);
      let updatedveggie = Object.keys(stockdata.data[0]).slice(16, 21);
      setVeggie(updatedveggie);
      let updatedmeat = Object.keys(stockdata.data[0]).slice(21, 26);
      setMeat(updatedmeat);
    }
  };

  const checkstock = async () => {
    let stockdata = await axios.get(`${env.api}/Inventory`, {
      headers: {
        Authorization: window.localStorage.getItem("app-token"),
      },
    });
    let checkstock = Object.keys(stockdata.data[0]).filter((data) => {
      return parseInt(stockdata.data[0][data]) < 20;
    });
    let requiredData = (obj, arr) =>
      Object.keys(obj)
        .filter((k) => arr.includes(k))
        .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

    let lowstock = requiredData(stockdata.data[0], checkstock);

    if (checkstock.length > 0) {
      await axios.post(
        `${env.api}/lowinventory`,
        {
          email: `${window.localStorage.getItem("username")}@gmail.com`,
          values: checkstock,
          required: lowstock,
        },
        {
          headers: {
            Authorization: window.localStorage.getItem("app-token"),
          },
        }
      );
    }
  };

  useEffect(() => {
    getstock();
  }, []);

  useEffect(() => {
    checkstock();
  }, []);

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
      <h3 className="text-center fw-bold text-primary">Pizza Base</h3>
      <Table striped bordered hover variant="priamry">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Description</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {base.length > 0 ? (
            base.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{data}</td>
                  <td>{stock[data]}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
            </tr>
          )}
        </tbody>
      </Table>
      <h3 className="text-center fw-bold text-primary">Pizza Sauce</h3>
      <Table striped bordered hover variant="priamry">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Description</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {sauce.length > 0 ? (
            sauce.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{data}</td>
                  <td>{stock[data]}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
            </tr>
          )}
        </tbody>
      </Table>
      <h3 className="text-center fw-bold text-primary">Pizza Cheese</h3>
      <Table striped bordered hover variant="priamry">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Description</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {cheese.length > 0 ? (
            cheese.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{data}</td>
                  <td>{stock[data]}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
            </tr>
          )}
        </tbody>
      </Table>
      <h3 className="text-center fw-bold text-primary">Pizza Veggie</h3>
      <Table striped bordered hover variant="priamry">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Description</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {veggie.length > 0 ? (
            veggie.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{data}</td>
                  <td>{stock[data]}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
            </tr>
          )}
        </tbody>
      </Table>
      <h3 className="text-center fw-bold text-primary">Pizza Meat</h3>
      <Table striped bordered hover variant="priamry">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Description</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {meat.length > 0 ? (
            meat.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{data}</td>
                  <td>{stock[data]}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminDashboard;
