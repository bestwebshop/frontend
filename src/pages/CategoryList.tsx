import React, { useEffect, useState } from "react";
import { Button, ButtonToolbar, Col, Container, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";
import Category from "../datatypes/Category";

//TODO: create new category
const CategoryList = () => {
  const [isLoading, setLoading] = useState(true); //true=fetch from api onload, false=only on button click
  const [isCreating, setCreating] = useState(false);
  const [loadedCategories, setLoadedCategories] = useState<Category[]>([{
    id: -1,
    name: "-"
  }]);

  useEffect(() => {
    if (isLoading) {
      axios.get('inventory-api/categories/').then((response) => {
        setLoading(false);
        let loadedCategories: Category[] = [];
        for (const cat_id in response.data) {
          loadedCategories.push({
            id: response.data[cat_id].id,
            name: response.data[cat_id].name
          });
        }
        setLoadedCategories(loadedCategories);
      });
    }
    if (isCreating) {
      axios.post('inventory-api/categories/', { "name": "new cat" }).then((response) => {
        setCreating(false);
        console.log("added product", response.data);
        setLoading(true);
      });
    }
  }, [setLoadedCategories, isLoading, setCreating, isCreating]);

  const handleClick = () => setLoading(true);
  const handleCreateClick = () => setCreating(true);
  let match = useRouteMatch();

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <Button
            variant="success"
            disabled={isCreating}
            onClick={!isCreating ? handleCreateClick : () => {
            }}
          >
            {isCreating ? 'Creating…' : 'Create'}
          </Button>
        </Col>
        <Col sm={4}>
          <h2>Categories</h2>
        </Col>
        <Col sm={4}>
          <Button
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? handleClick : () => {
            }}
          >
            {isLoading ? 'Fetching Categories…' : 'Refresh List'}
          </Button>
        </Col>
      </Row>
      <Row>
        {loadedCategories.length === 0 ? <>No Categories</> : (loadedCategories[0].id === -1 ? <>Loading...</> :
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {
                loadedCategories.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      <ButtonToolbar>
                        <LinkContainer to={`${match.url}/${item.id.toString()}`}>
                          <Button variant="secondary">Details</Button>
                        </LinkContainer>
                        <Button variant="danger">Delete</Button>
                      </ButtonToolbar>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        )}
      </Row>
    </Container>

  );
};

export default CategoryList;