import { useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";

function AdminPizzaDetails() {
  let params = useParams();
  let navigate = useNavigate();
  let context = useContext(UserContext);
  console.log(context.cartItem);
  let getitem = async () => {
    await console.log(context.cartItem);
    let pizza = await context.cartItem.find((instance) => {
      return instance._id === params.pizzaid;
    });
    console.log(pizza);
  };
  // let pizza = {};
  useEffect(() => {
    getitem();
  }, []);

  return (
    <>
      <h3 className="text-center fw-bold text-primary">Pizza Name</h3>
      <Table striped bordered hover variant="priamry">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Thornton</td>
            <td>Thornton</td>
          </tr>
        </tbody>
      </Table>
      <button
        className="btn btn-primary ms-3 d-inline"
        onClick={() => navigate("/adminhome")}
      >
        Back To Varities
      </button>
    </>
  );
}

export default AdminPizzaDetails;
