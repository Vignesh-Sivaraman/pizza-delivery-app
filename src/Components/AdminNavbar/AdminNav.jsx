import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AdminNav() {
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
            <Nav.Link className="text-white">Stock Inv</Nav.Link>
            <Nav.Link className="text-white">Orders</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNav;
