import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Logo from "../../assets/images/Logo.png";

const Home = () => {
  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        <Col md={4} className="text-center">
          <Image src={Logo} rounded fluid className="w-100" />
        </Col>

        <Col md={8}>
          <h1 className="text-center">Welcome to Event Manager</h1>
          <p className="text-center mt-3">
            Your one-stop solution for managing your events and tasks
            efficiently. Stay organized and never miss a deadline with our
            intuitive event management platform. Get started today by creating
            a free account and take control of your schedule!
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
