import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Error404 = () => {
  return (
    <Container>
      <Row>
        <Col sm={12}>
          <h2>Error</h2>
          <h1 className="extreme-big">404</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default Error404;