import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

function AdminPizzaDetails() {
  let navigate = useNavigate();
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
