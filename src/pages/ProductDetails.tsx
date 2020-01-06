import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link, useParams, useHistory} from "react-router-dom";
import Product from "../datatypes/Product";
import axios from "axios";
import {LinkContainer} from "react-router-bootstrap";

const ProductDetails = () => {
  let { productID } = useParams();

  const [isLoading, setLoading] = useState(true); //true=fetch from api onload, false=only on button click
  const [isDeleting, setDeleting] = useState(false);
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

    const history = useHistory();

    useEffect(() => {
        if (isLoading) {
            //TODO: replace product api by composite inventory api with category name from http://bestwebshop.tech:9201/inventory-api/products
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
        if(isDeleting){
            setDeleting(false);
             axios.delete('http://bestwebshop.tech:9204/products/'+(productID === undefined ? "undefined_product_ID" : productID)).then((response)=>{
                console.log("deleted product", response.data)
                history.push("/products");//redirect
            })
        }
    }, [setLoadedProduct, productID, isLoading, isDeleting, history]);

    const handleClick = () => setLoading(true);
    const handleDeleteClick = () => setDeleting(true);

  return (
      <Container>
        <Row>
            <Col sm={2}>
                <LinkContainer to="/products">
                    <Button variant="secondary">Back</Button>
                </LinkContainer>
            </Col>
            <Col sm={8}>
                <h2>Product Details</h2>
            </Col>
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
        </Row>
          <Row>
              Requested product ID: {productID}
          </Row>
          <Row>
              <Col sm>
                  {loadedProduct.id === -1 ? <>Loading...</> :
                      <>
                    <b>#</b> {loadedProduct.id} <br/>
                      <b>Name</b> {loadedProduct.name} <br/>
                              <b>Price</b> {loadedProduct.price} € <br/>
                              <b>Category</b> <Link to={"/categories/"+loadedProduct.category.id}>{loadedProduct.category.name}</Link> <br/>
                              <b>Details</b> {loadedProduct.details} <br/>
                              <b>Actions</b>
                                  <Button
                                        variant="danger"
                                        disabled={isDeleting}
                                        onClick={!isDeleting ? handleDeleteClick : () => {}}
                                  >
                                    {isDeleting ? 'Deleting…' : 'Delete'}
                                  </Button>
                      </>
                      }
              </Col>
          </Row>
      </Container>
  );
}

export default ProductDetails