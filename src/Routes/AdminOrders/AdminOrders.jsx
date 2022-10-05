import { config } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { env } from "../../config/config";

const AdminOrders = () => {
  let [first, setFirst] = useState("");
  let [order, setOrder] = useState({});
  let [datas, setDatas] = useState([]);
  let [stock, setStock] = useState([]);
  let [status, setStatus] = useState(false);
  let [currents, setCurrents] = useState({});
  let navigate = useNavigate();
  let getorders = async () => {
    let orderData = await axios.get(`${env.api}/getcartpizzas`, {
      headers: {
        Authorization: window.localStorage.getItem("app-token"),
      },
    });
    setStatus(orderData.data[0].orderApproved);
    setOrder(orderData.data[0]);
    setFirst(orderData.data[0].email);

    let stocknames = orderData.data[0].orders.map((data) => {
      let substock = [];
      substock.push(data.pizza_base);
      substock.push(data.pizza_sauce);
      substock.push(data.pizza_cheese);
      substock.push(...data.pizza_veggie);
      substock.push(...data.pizza_meat);

      return substock;
    });

    setStock(stocknames);

    let pizzzanames = orderData.data[0].orders.map((data) => {
      return data.pizza_name;
    });

    setDatas(pizzzanames);

    let user = await axios.get(`${env.api}/inventory`, {
      headers: {
        Authorization: window.localStorage.getItem("app-token"),
      },
    });
    let current_stock = {
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
    };
    setCurrents(current_stock);
  };

  useEffect(() => {
    getorders();
  }, []);

  let zz = {};
  setTimeout(() => {
    stock.map((data) => {
      for (let num of data) {
        zz[num] = zz[num] ? ++zz[num] : 1;
      }
    });

    Object.keys(zz).map((data) => {
      if (currents[data]) {
        currents[data] = currents[data] - zz[data];
      }
    });
  }, 100);

  const approveorders = async () => {
    let postorder = await axios.post(`${env.api}/approvecartpizzas`, currents, {
      headers: {
        Authorization: window.localStorage.getItem("app-token"),
      },
    });
    if (postorder.status === 200) {
      setStatus(false);
      alert(postorder.data.message);
      navigate("/adminhome");
    }
  };

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
                <span style={{ color: "green" }}> order delivered </span>
              ) : (
                <button
                  className="btn btn-warning"
                  onClick={() => approveorders()}
                >
                  Approve Order
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default AdminOrders;
