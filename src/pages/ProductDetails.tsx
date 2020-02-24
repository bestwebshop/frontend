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
  const [editedProduct, setEditedProduct] = useState<Product>({ ...loadedProduct});

    const history = useHistory();

    useEffect(() => {
        if (isLoading) {
            axios.get('inventory-api/products/'+(productID === undefined ? "undefined_product_ID" : productID)).then((response) => {
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
            axios.delete('inventory-api/products/'+(productID === undefined ? "undefined_product_ID" : productID)).then((response)=>{
                setDeleting(false);
                console.log("deleted product", response.data)
                history.push("/products");//redirect
            })
        }
        if(isEditing){
            console.log("saving edited:",editedProduct)
            axios.put('inventory-api/products/'+(productID === undefined ? "undefined_product_ID" : productID), editedProduct).then((response)=>{
                setEditing(false);
                console.log("edited product", response.data)
                setLoading(true)
            })
        }
    }, [setLoadedProduct, productID, isLoading, isDeleting, isEditing, history, editedProduct]);

    const handleClick = () => setLoading(true);
    const handleDeleteClick = () => setDeleting(true);
    const handleEditClick = () => setEditing(true);
    
    const onNameChange = (val:string) => {
        let e = { ...editedProduct};
        e.name = val.toString();
        setEditedProduct({...e}); //this is async but does not support await
        //console.log(val,e.name, editedProduct.name)
    }

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
                            <Form.Group controlId="editItem.id" as={Row}>
                                <Form.Label column sm="2">#</Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={loadedProduct.id} />
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="editItem.name" as={Row}>
                                <Form.Label column sm="2">Name</Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" placeholder={editedProduct.name} value={editedProduct.name} onChange={(e:any) => onNameChange(e.target.value)}/>
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="editItem.price" as={Row}>
                                <Form.Label column sm="2">Price</Form.Label>
                                <Col sm="10">
                                    <InputGroup>
                                        <Form.Control type="number" placeholder={editedProduct.price.toString()} defaultValue={loadedProduct.price.toString()} />
                                        <InputGroup.Append>
                                            <InputGroup.Text id="price-addon">€</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="editItem.ControlSelect1" as={Row}>
                                <Form.Label column sm="2">Category</Form.Label>
                                <Col sm="10"><Form.Control as="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control></Col>
                            </Form.Group>
                            <Form.Group controlId="editItem.details" as={Row}>
                                <Form.Label column sm="2">Details</Form.Label>
                                <Col sm="10">
                                    <Form.Control as="textarea" rows="3" defaultValue={editedProduct.details} />
                                </Col>
                            </Form.Group>
                        </Form>
                        <br/>
                        <b>Category</b> <Link to={"/categories/"+editedProduct.category.id}>{editedProduct.category.name}</Link> <br/>
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
                        {isEditing ? 'Editing...' : 'Save Edit'}
                        </Button>
                      </>
                      }
              </Col>
          </Row>
      </Container>
  );
}

export default ProductDetails