import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const Header = () => {
  return (
    <div>
      <Navbar expand="sm" className="bg-dark" variant="dark">
        <Container>
          <Navbar.Brand href="/" className="text-white">
            Event Manager
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Button variant="primary" className="me-4" as={Link} to="/login">
                Login
              </Button>
              <Button variant="outline-light" as={Link} to="/signup">
                Signup
              </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
