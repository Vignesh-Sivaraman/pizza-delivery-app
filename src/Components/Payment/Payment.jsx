import React, { Fragment, useContext, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { env } from "../../config/config";
import UserContext from "../../context/UserContext";

const Payment = () => {
  const { setCount } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [orderInfo, setOrderInfo] = useState({});

  // eslint-disable-next-line

  let orders = JSON.parse(window.localStorage.getItem("cart-items"));
  let email = window.localStorage.getItem("username");
  let orderTotal = window.localStorage.getItem("cart-total");
  let orderApproved = false;

  const orderData = {
    orders,
    email,
    orderTotal,
    orderApproved,
  };

  // to get Order ID from razorpay

  const getOrderID = async () => {
    try {
      setLoading(true);
      let generateOrder = await axios.post(
        `${env.api}/razorpay`,
        { amount: orderTotal },
        {
          headers: {
            Authorization: window.localStorage.getItem("app-token"),
          },
        }
      );
      if (generateOrder.status === 200) setOrderInfo(generateOrder.data);
      setLoading(false);
    } catch (err) {
      alert(`Error Code: ${err.response.status}- ${err.response.data.message}`);
    }
  };

  useEffect(() => {
    if (orderTotal !== "0") {
      getOrderID();
    } else {
    }
    // eslint-disable-next-line
  }, [orderTotal]);

  // process payment

  const processPayment = async () => {
    try {
      const options = {
        key: "rzp_test_xBhEWrH6cW2ePT",
        currency: "INR",
        amount: orderInfo.amount,
        order_id: orderInfo.id,
        name: "Pizza Lair",
        description: "Thanks for Purchasing from us",
        image:
          "https://static.vecteezy.com/system/resources/previews/003/689/653/original/pizza-logo-free-vector.jpg",
        handler: function (response) {
          console.log(typeof response);
          if (response) {
            paymentSuccess(response);
          } else {
            alert("payment failed, try again");
          }
        },
        prefill: {
          name: email,
          email: `${email}@gmail.com`,
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const proceedToRazorpay = new window.Razorpay(options);
      proceedToRazorpay.open();
    } catch (err) {
      alert(`Error Code: ${err.response.status}- ${err.response.data.message}`);
    }
  };

  // on success payment

  const paymentSuccess = async (orderDetails) => {
    try {
      orderData.orderId = orderDetails.razorpay_order_id;
      setLoading(true);
      let user = await axios.post(`${env.api}/cartpizzas`, orderData, {
        headers: {
          Authorization: window.localStorage.getItem("app-token"),
        },
      });
      setLoading(false);
      if (user.status === 200) {
        alert(user.data.message);
        let cart = [];
        window.localStorage.setItem("cart-items", JSON.stringify(cart));
        window.localStorage.setItem("cart-total", 0);
        window.localStorage.setItem("cart-count", 0);
        setCount(window.localStorage.getItem("cart-count"));
        navigate("/home/orderconfirmation");
      }
    } catch (err) {
      alert(`Error Code: ${err.response}- ${err.response}`);
    }
  };

  return (
    <Col className="cart-payment-container">
      {loading ? (
        <div
          style={{
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          Loading...
        </div>
      ) : (
        ""
      )}
      <Fragment>
        <button
          className="btn btn-success fs-3 fw-bold my-4"
          onClick={() => processPayment()}
        >
          Proceed to Check out:
          <span className="mx-2">
            Rs. {parseInt(window.localStorage.getItem("cart-total"))}/-
          </span>
        </button>
      </Fragment>
    </Col>
  );
};

export default Payment;
