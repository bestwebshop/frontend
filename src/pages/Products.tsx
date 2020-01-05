import React, {useEffect, useState} from "react";
import {Button, ButtonToolbar, Col, Container, Row, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import axios from "axios";
import User from "../datatypes/User";

const Products = () => {
    const [isLoading, setLoading] = useState(false);
    const [loadedUser, setLoadedUser] = useState<User>({
        id: 0,
        lastname: "placeholder",
        firstname: "tim",
        username: "tpl",
        password: "paswd",
        role: {
          id: 1,
          typ: "testuser",
          level: 1
        }
    });

    useEffect(() => {
        if (isLoading) {
            axios.get('http://bestwebshop.tech:9203/user/1').then((response) => {
                setLoading(false);
                //creating a list of KeyValueLists (e.g. products, categories and users -> Composite Server)
                let loadedUser : User = {
                  id: response.data.id,
                  lastname: response.data.lastname,
                  firstname: response.data.firstname,
                  username: response.data.username,
                  password: response.data.password,
                  role: {
                    id: response.data.role.id,
                    typ: response.data.role.typ,
                    level: response.data.role.level
                  }
                }
                setLoadedUser(loadedUser);
                //console.log(response.data);
                //console.log(resp);
            });
        }
    }, [setLoadedUser, isLoading]);

    const handleClick = () => setLoading(true);

  return (
      <Container>
        <Row>
          <Col sm={8}>
            <h2>Products</h2>
          </Col>
            <Col sm={4}>
                <Button
                    variant="primary"
                    disabled={isLoading}
                    onClick={!isLoading ? handleClick : () => {
                    }}
                >
                    {isLoading ? 'Fetching Products…' : 'Refresh List'}
                </Button>
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
                      <td>Socks of {loadedUser.firstname}</td>
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
}

export default Products