import React from "react";
import {Alert, Button, ButtonToolbar, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import ProductList from "../components/ProductList";
import ProductListEntry from "../components/ProductListEntry";

const Home = () => {
    return (
      <Container>
        <Row>
          <Col sm={2}>
            Step 1:
          </Col>
          <Col sm={4}>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">User</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Col>
          <Col sm={4}>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="password"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Col>
          <Col sm={2}>
            <Button variant="primary">Login</Button>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Alert variant="warning">
              This Website is Work-In-Progress!
            </Alert>
          </Col>

        </Row>
        <Row>
          <Col sm>
            <ProductList>
              <ProductListEntry name="Shoes" />
              <ProductListEntry name="Shirts" />
              <ProductListEntry name="Jackets" />
            </ProductList>
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
        <Row>

        </Row>
      </Container>
    );
}

export default Home