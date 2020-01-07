import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row, Form, InputGroup} from "react-bootstrap";
import {Link, useParams, useHistory} from "react-router-dom";
import Product from "../datatypes/Product";
import axios from "axios";
import {LinkContainer} from "react-router-bootstrap";

const ProductDetails = () => {
  let { productID } = useParams();

  const [isLoading, setLoading] = useState(true); //true=fetch from api onload, false=only on button click
  const [isDeleting, setDeleting] = useState(false);
  const [isEditing, setEditing] = useState(false);

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
const [editedProduct, setEditedProduct] = useState<Product>(loadedProduct);

    const history = useHistory();

    useEffect(() => {
        if (isLoading) {
            //TODO: replace product api by composite inventory api with category name from http://bestwebshop.tech:9201/inventory-api/products
            axios.get('http://bestwebshop.tech:9201/inventory-api/products/'+(productID === undefined ? "undefined_product_ID" : productID)).then((response) => {
                setLoading(false);
                let loadedProduct : Product = {
                    id: response.data.id,
                    name: response.data.name,
                    price: response.data.price,
                    details: response.data.details,
                    category: {
                      id: response.data.category.id,
                      name: response.data.category.name
                    }
                };
                setLoadedProduct(loadedProduct);
                setEditedProduct(loadedProduct);
            });
        }
        if(isDeleting){
            axios.delete('http://bestwebshop.tech:9201/inventory-api/products/'+(productID === undefined ? "undefined_product_ID" : productID)).then((response)=>{
                setDeleting(false);
                console.log("deleted product", response.data)
                history.push("/products");//redirect
            })
        }
        if(isEditing){
            editedProduct.name = "updated";
            console.log(editedProduct)
            axios.put('http://bestwebshop.tech:9201/inventory-api/products/'+(productID === undefined ? "undefined_product_ID" : productID), editedProduct).then((response)=>{
                setEditing(false);
                console.log("edited product", response.data)
                setLoading(true)
            })
        }
    }, [setLoadedProduct, productID, isLoading, isDeleting, isEditing, history, editedProduct]);

    const handleClick = () => setLoading(true);
    const handleDeleteClick = () => setDeleting(true);
    const handleEditClick = () => setEditing(true);

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
                      <Form>
                        <Form.Group controlId="editItem.id">
                            <Form.Label>#</Form.Label>
                            <Form.Control plaintext readOnly defaultValue={loadedProduct.id} />
                        </Form.Group>
                        <Form.Group controlId="editItem.name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder={loadedProduct.name.toString()} defaultValue={loadedProduct.name.toString()} />
                        </Form.Group>
                        <Form.Group controlId="editItem.price">
                            <Form.Label>Price</Form.Label>
                            <InputGroup>
                                <Form.Control type="number" placeholder={loadedProduct.price.toString()} defaultValue={loadedProduct.price.toString()} />
                                <InputGroup.Append>
                                    <InputGroup.Text id="price-addon">€</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="editItem.ControlSelect1">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="editItem.ControlSelect2">
                            <Form.Label>Example multiple select</Form.Label>
                            <Form.Control as="select" multiple>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="editItem.ControlTextarea1">
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows="3" />
                        </Form.Group>
                        </Form>
                        <br/>
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
                        <Button
                            variant="warning"
                            disabled={isEditing}
                            onClick={!isEditing ? handleEditClick : () => {}}
                        >
                        {isDeleting ? 'Editing...' : 'Edit'}
                        </Button>
                      </>
                      }
              </Col>
          </Row>
      </Container>
  );
}

export default ProductDetails