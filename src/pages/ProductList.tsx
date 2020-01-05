import React, {useEffect, useState} from "react";
import {Button, ButtonToolbar, Col, Container, Row, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import axios from "axios";
import Product from "../datatypes/Product";
import {Link, useRouteMatch} from "react-router-dom";


const ProductList = () => {
    const [isLoading, setLoading] = useState(true); //true=fetch from api onload, false=only on button click
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

    useEffect(() => {
        if (isLoading) {
                        //TODO: replace user api by products from http://bestwebshop.tech:9201/inventory-api/products

            axios.get('http://bestwebshop.tech:9204/products/').then((response) => {
                setLoading(false);
                //creating a list of Products (e.g. products, categories and users -> Composite Server)
                let loadedProducts : Product[] = [];
                for (const prod_id in response.data) {
                    loadedProducts.push({
                        id: response.data[prod_id].id,
                        name: response.data[prod_id].name,
                        price: response.data[prod_id].price,
                        details: response.data[prod_id].details,
                        category: {
                          id: response.data[prod_id].categoryID,
                          name: "placeholder_cat_name"
                        }
                    })
                }
                setLoadedProducts(loadedProducts);
            });
        }
    }, [setLoadedProducts, isLoading]);

    const handleClick = () => setLoading(true);
    let match  = useRouteMatch();

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
              {loadedProducts[0].id === -1 ? <>Loading...</> :
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
                                  <td><Link to={"/category/" + item.category.id}>{item.category.name}</Link></td>
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
              }
          </Row>
      </Container>

  );
}

export default ProductList