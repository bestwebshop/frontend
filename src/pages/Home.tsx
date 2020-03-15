import React from "react";
import { Alert, Button, ButtonToolbar, Col, Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col sm={12}>
          <Alert variant="warning">
            This Website is Work-In-Progress!
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col sm>
          <ButtonToolbar>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="info">Info</Button>
            <Button variant="dark">Dark</Button>
          </ButtonToolbar>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;