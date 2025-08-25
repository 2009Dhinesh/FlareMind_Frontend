import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/nav.css";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="custom-navbar" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/Home" className="custom-brand">
          <i className="fa-solid fa-cloud-moon"></i> Flaremind
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Home" className="custom-navlink">
              <i className="fa-solid fa-book"></i>&nbsp;Home
            </Nav.Link>
            <Nav.Link as={Link} to="/Users" className="custom-navlink">
              <i className="fa-solid fa-notes-medical"></i>&nbsp;Users
            </Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

