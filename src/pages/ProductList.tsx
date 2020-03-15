import React, { useEffect, useState } from "react";
import { Button, ButtonToolbar, Col, Container, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import Product from "../datatypes/Product";
import { Link, useRouteMatch } from "react-router-dom";
import GlobalSettings from "GlobalSettings";


const ProductList = () => {
  const [isLoading, setLoading] = useState(true); //true=fetch from api onload, false=only on button click
  const [isCreating, setCreating] = useState(false);
  const [isDeleting, setDeleting] = useState(0);
  const [loadedProducts, setLoadedProducts] = useState<Product[]>([{
    id: -1,
    name: "-",
    price: 0,
    details: "-",
    category: {
      id: 0,
      name: "-"
    }
  }]);
  const [loggedInUser] = useState(GlobalSettings.defaultLoggedInUser);

  useEffect(() => {
    if (isLoading) {
      axios.get('inventory-api/products/').then((response) => {
        setLoading(false);
        //creating a list of Products (e.g. products, categories and users -> Composite Server)
        let loadedProducts: Product[] = [];
        for (const prod_id in response.data) {
          loadedProducts.push({
            id: response.data[prod_id].id,
            name: response.data[prod_id].name,
            price: response.data[prod_id].price,
            details: response.data[prod_id].details,
            category: {
              id: response.data[prod_id].category.id,
              name: response.data[prod_id].category.name
            }
          });
        }
        setLoadedProducts(loadedProducts);
      });
    }
    if (isCreating) {
      axios.post('inventory-api/products/', { "name": "hi", "details": "test", "price": 12, "category": "cat of new product" }).then((response) => {
        setCreating(false);
        console.log("added product", response.data);
        setLoading(true);
      });
    }
    if (isDeleting > 0) {
      axios.delete('inventory-api/products/' + isDeleting.toString()).then((response) => {
        setDeleting(0);
        console.log("deleted product", response.data);
        setLoading(true);
      });
    }
  }, [setLoadedProducts, isLoading, isCreating, isDeleting]);

  const handleClick = () => setLoading(true);
  const handleCreateClick = () => setCreating(true);
  const handleDeleteClick = (id: number) => setDeleting(id);
  let match = useRouteMatch();

  return (
    <Container>
      <Row>
        <Col sm={4}>
          {loggedInUser.role.level > 0 ? <></> :
            <Button
              variant="success"
              disabled={isCreating}
              onClick={!isCreating ? handleCreateClick : () => {
              }}
            >
              {isCreating ? 'Creating…' : 'Create'}
            </Button>
          }
        </Col>
        <Col sm={4}>
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
        {loadedProducts.length === 0 ? <>No Products</> : (loadedProducts[0].id === -1 ? <>Loading...</> :
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
              {
                loadedProducts.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price} €</td>
                    <td><Link to={"/categories/" + item.category.id}>{item.category.name}</Link></td>
                    <td>
                      <ButtonToolbar>
                        <LinkContainer to={`${match.url}/${item.id.toString()}`}>
                          <Button variant="secondary">Details</Button>
                        </LinkContainer>
                        {loggedInUser.role.level > 0 ? <></> :
                          <Button
                            variant="danger"
                            disabled={isDeleting > 0}
                            onClick={isDeleting === 0 ? () => { handleDeleteClick(item.id); } : () => { }}
                          >
                            {isDeleting > 0 ? 'Deleting…' : 'Delete'}
                          </Button>
                        }
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

export default ProductList;