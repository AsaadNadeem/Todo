import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand href="/">Event Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav defaultActiveKey={"/"} variant="underline" className="d-flex">
            <Nav.Item>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to={"/add-event"} className="nav-link">
                Add Event
              </Link>
            </Nav.Item>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
