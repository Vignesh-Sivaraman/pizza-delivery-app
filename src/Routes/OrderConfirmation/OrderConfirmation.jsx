import { config } from "@fortawesome/fontawesome-svg-core";
import { faWindowRestore } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { env } from "../../config/config";

const OrderConfirmation = () => {
  let navigate = useNavigate();
  let [first, setFirst] = useState("");
  let [order, setOrder] = useState({});
  let [datas, setDatas] = useState([]);
  let [status, setStatus] = useState(false);
  useEffect(() => {
    if (!window.localStorage.getItem("app-token")) {
      alert("Please Login");
      navigate("/");
    }
  }, []);
  let deleteData = async () => {
    await axios.get(`${env.api}/deletecartpizzas`, {
      headers: {
        Authorization: window.localStorage.getItem("app-token"),
      },
    });
  };

  let getorders = async () => {
    let orderData = await axios.get(`${env.api}/getcartpizzas`, {
      headers: {
        Authorization: window.localStorage.getItem("app-token"),
      },
    });
    setOrder(orderData.data[0]);
    setFirst(orderData.data[0].email);

    let pizzzanames = orderData.data[0].orders.map((data) => {
      return data.pizza_name;
    });

    setDatas(pizzzanames);

    if (orderData.data[0].orderApproved) {
      setStatus(orderData.data[0].orderApproved);
      setTimeout(() => {
        alert("order confirmed");
        deleteData();
        navigate("/home");
      }, 1000);
    }
  };
  useEffect(() => {
    getorders();
  }, []);

  return (
    <div
      className="container mx-auto"
      style={{
        position: "relative",
        top: "114px",
        overflow: "hidden",
        height: "auto",
        width: "100%",
      }}
    >
      <h3 className="my-5">
        <span style={{ color: "red" }}>
          The admin has notified in the mail. If you are a tester, Please login
          to adminaccount from a seperate browser or Incognito mode. Refresh the
          page to see status if admin has approved.
        </span>
      </h3>
      <h3 className="text-center fw-bold text-primary">Pizza Name</h3>
      <Table striped bordered hover variant="priamry">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>OrderDetails</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{first}</td>
            <td>{datas.length > 1 ? datas.join(",") : ""}</td>
            <td>Rs.{order.orderTotal}/-</td>
            <td>
              {status ? (
                <span style={{ fontWeight: "bold", color: "green" }}>
                  order Approved
                </span>
              ) : (
                <span style={{ fontWeight: "bold", color: "orange" }}>
                  waiting for Approval
                </span>
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default OrderConfirmation;
