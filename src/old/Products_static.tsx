import React from "react";
import { Button, ButtonToolbar, Col, Container, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Products = () => {
  return (
    <Container>
      <Row>
        <Col sm={10}>
          <h2>Products</h2>
        </Col>
        <Col sm={2}>
          <Button variant="primary">Refresh List</Button>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover variant="dark" responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Socks</td>
              <td>2.99 €</td>
              <td>Clothing</td>
              <td>
                <ButtonToolbar>
                  <LinkContainer to="/products/1">
                    <Button variant="secondary">Details</Button>
                  </LinkContainer>
                  <Button variant="danger">Delete</Button>
                </ButtonToolbar>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Trousers</td>
              <td>29.99 €</td>
              <td>Clothing</td>
              <td>
                <ButtonToolbar>
                  <LinkContainer to="/products/2">
                    <Button variant="secondary">Details</Button>
                  </LinkContainer>
                  <Button variant="danger">Delete</Button>
                </ButtonToolbar>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Ugly Sweater</td>
              <td>19.49 €</td>
              <td>Clothing</td>
              <td>
                <ButtonToolbar>
                  <LinkContainer to="/products/3">
                    <Button variant="secondary">Details</Button>
                  </LinkContainer>
                  <Button variant="danger">Delete</Button>
                </ButtonToolbar>
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default Products;