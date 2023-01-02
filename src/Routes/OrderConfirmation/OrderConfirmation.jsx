import { config } from "@fortawesome/fontawesome-svg-core";
import { faWindowRestore } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { env } from "../../config/config";

const OrderConfirmation = () => {
  let navigate = useNavigate();
  // let [first, setFirst] = useState("");
  let [orders, setOrders] = useState([]);
  // let [datas, setDatas] = useState([]);
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
    setOrders(orderData.data);
    // setFirst(orderData.data[0].email);

    // let pizzzanames = orderData.data[0].orders.map((data) => {
    //   return data.pizza_name;
    // });

    // setDatas(pizzzanames);

    // if (orderData.data[0].orderApproved) {
    //   setStatus(orderData.data[0].orderApproved);
    //   setTimeout(() => {
    //     alert("order confirmed");
    //     deleteData();
    //     navigate("/home");
    //   }, 1000);
    // }
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
      <h3 className="text-center fw-bold text-primary">Your orders</h3>
      {orders
        ? orders.map((order, i) => {
            return (
              <table className="table table-hover table-bordered" key={i + 1}>
                <thead className="table-info">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">OrderID</th>
                    <th scope="col">Total</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{order.email}</td>
                    <td>{order.orderId}</td>
                    <td>Rs.{order.orderTotal}/-</td>
                    <td>
                      {order.orderApproved ? (
                        <span style={{ fontWeight: "bold", color: "green" }}>
                          Delivered
                        </span>
                      ) : (
                        <span style={{ fontWeight: "bold", color: "orange" }}>
                          In preparation
                        </span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })
        : ""}
    </div>
  );
};

export default OrderConfirmation;
