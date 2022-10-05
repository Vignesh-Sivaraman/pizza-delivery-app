import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState, useContext } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { env } from "../../config/config";
import { faTruckLoading } from "@fortawesome/free-solid-svg-icons";

const Payment = ({ totalPrice }) => {
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState();
  // eslint-disable-next-line

  let orders = JSON.parse(window.localStorage.getItem("cart-items"));
  let email = window.localStorage.getItem("username");
  let orderTotal = window.localStorage.getItem("cart-total");
  let orderApproved = false;

  const stripePromise = loadStripe(
    "pk_test_51K11LVSEPEmhN4c2o2qQmMK7N07mPHzJMmSy5CpwXb9mgbTRotBNrxl9lnWiY6qkbEVz3PQbIqNKdwhyqMhTGwLw003V1gclUL"
  );

  async function handlePay(e, elements, stripe) {
    e.preventDefault();
    if (!stripe || !elements) return;

    const orderData = {
      orders,
      email,
      user,
      address,
      country,
      orderTotal,
      orderApproved,
    };

    const cardElement = elements.getElement(CardElement);
    // eslint-disable-next-line
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) Alert(error);
    else {
      try {
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
          navigate("/home/orderconfirmation");
        }
      } catch (err) {
        alert(
          `Error Code: ${error.response.status}- ${error.response.data.message}`
        );
      }
      //   const orderConfirmation = await dispatch(placeOrder(orderData));
      //   if (orderConfirmation) {
      //     dispatch(updateUser(user._id));
      // alert("Order Placed Successfully");
      // setTimeout(() => {
      //   navigate(`/`);
      // }, 1200);
      //   }
    }
  }
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
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <Form
              onSubmit={(e) => handlePay(e, elements, stripe)}
              className="stripe-elements"
            >
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      value={
                        window.localStorage.getItem("username")
                          ? window.localStorage.getItem("username")
                          : ""
                      }
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={7}>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <p style={{ color: "blue" }}>
                <h3>Test Case</h3>
              </p>
              <div className="my-2">
                <b className="mx-2">Card Number</b>
                <span style={{ color: "blue" }}>: 4242 4242 4242 4242</span>
                <b className="mx-2">MM/YY</b>
                <span style={{ color: "blue" }}>: 04 / 24</span>
                <b className="mx-2">CVV</b>
                <span style={{ color: "blue" }}>: 242</span>
                <b className="mx-2">ZIP</b>
                <span style={{ color: "blue" }}>: 42424</span>
              </div>

              <label className="fw-bold my-5 fs-5" htmlFor="card-element">
                Enter Card Details below (all fields mandatory)
              </label>
              <CardElement className="" />
              <button
                className="btn btn-success fs-3 fw-bold my-4"
                type={"submit"}
              >
                Proceed to Check out:
                <span className="mx-2">
                  Rs. {parseInt(window.localStorage.getItem("cart-total"))}/-
                </span>
              </button>
            </Form>
          )}
        </ElementsConsumer>
      </Elements>
    </Col>
  );
};

export default Payment;
