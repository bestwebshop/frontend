import React, {useEffect, useState} from "react";
import {Button, ButtonToolbar, Col, Container, Row} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import Product from "../datatypes/Product";
import axios from "axios";

const ProductDetails = () => {
  let { productID } = useParams();

  const [isLoading, setLoading] = useState(true); //true=fetch from api onload, false=only on button click
  const [loadedProduct, setLoadedProduct] = useState<Product>({
        id: -1,
        name: "-",
        price: 0,
        details: "-",
        category: {
            id: 0,
            name: "-"
        }
    });


    useEffect(() => {
        if (isLoading) {
            //TODO: replace product api by products from http://bestwebshop.tech:9201/inventory-api/products
            axios.get('http://bestwebshop.tech:9204/products/'+(productID === undefined ? "undefined_product_ID" : productID)).then((response) => {
                setLoading(false);
                let loadedProduct : Product = {
                    id: response.data.id,
                    name: response.data.name,
                    price: response.data.price,
                    details: response.data.details,
                    category: {
                      id: response.data.categoryID,
                      name: "category_"+response.data.categoryID.toString()
                    }
                };
                setLoadedProduct(loadedProduct);
            });
        }
    }, [setLoadedProduct, productID, isLoading]);

    const handleClick = () => setLoading(true);

  return (
      <Container>
        <Row>
          <Col sm={12}>
            <h2>Product Details</h2>
          </Col>
        </Row>
          <Row>
              Requested product ID: {productID}
          </Row>
          <Row>
              <Col sm={2}>
                  <Button
                        variant="primary"
                        disabled={isLoading}
                        onClick={!isLoading ? handleClick : () => {
                        }}
                    >
                        {isLoading ? 'Fetching Product…' : 'Refresh'}
                    </Button>
              </Col>
              <Col sm={10}>
                  {loadedProduct.id === -1 ? <>Loading...</> :
                      <>
                    <b>#</b> {loadedProduct.id} <br/>
                      <b>Name</b> {loadedProduct.name} <br/>
                              <b>Price</b> {loadedProduct.price} € <br/>
                              <b>Category</b> <Link to={"/category/"+loadedProduct.category.id}>{loadedProduct.category.name}</Link> <br/>
                              <b>Details</b> {loadedProduct.details} <br/>
                              <b>Actions</b>
                              <ButtonToolbar>
                                  <Button variant="danger">Delete</Button>
                              </ButtonToolbar>
                      </>
                      }
              </Col>
          </Row>
      </Container>
  );
}

export default ProductDetails