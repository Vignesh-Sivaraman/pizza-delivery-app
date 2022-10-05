import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AdminNav() {
  let navigate = useNavigate();
  return (
    <Navbar
      bg="primary"
      expand="lg"
      className="p-3 container-fluid"
      style={{ position: "fixed", zIndex: 1000 }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/adminhome" className="text-white">
          <span
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse.show"
          >
            Pizza-Lair-Admin
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              as={Link}
              to="/adminhome/adminpizzavarities"
              className="text-white"
            >
              <span
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
              >
                Pizza Varities
              </span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/adminhome/adminaddstock"
              className="text-white"
            >
              <span
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
              >
                Add Stock
              </span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/adminhome/adminorders"
              className="text-white"
            >
              <span
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
              >
                Orders
              </span>
            </Nav.Link>
            <span className=" text-white fw-bold mx-3 me-2 ">
              {window.localStorage.getItem("username")}
            </span>
            <button
              onClick={() => {
                window.localStorage.clear();
                navigate("/");
              }}
              className="btn d-block btn-primary bg-white text-primary fw-bold ms-2 me-2 cart-button "
              style={{ position: "relative" }}
            >
              Logout
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNav;
