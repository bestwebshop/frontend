import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import Category from "../datatypes/Category";
import { LinkContainer } from "react-router-bootstrap";

const CategoryDetails = () => {
  let { categoryID } = useParams();

  const [isLoading, setLoading] = useState(true); //true=fetch from api onload, false=only on button click
  const [isEditing, setEditing] = useState(false);
  //TODO: const [isDeleting, setDeleting] = useState(false);

  const [loadedCategory, setLoadedCategory] = useState<Category>({
    id: -1,
    name: "-"
  });
  const [editedCategory, setEditedCategory] = useState<Category>({ ...loadedCategory });

  useEffect(() => {
    if (isLoading) {
      axios.get('inventory-api/categories/' + (categoryID === undefined ? "undefined_category_ID" : categoryID)).then((response) => {
        setLoading(false);
        let loadedCategory: Category = {
          id: response.data.id,
          name: response.data.name
        };
        setLoadedCategory(loadedCategory);
        setEditedCategory(loadedCategory);
      });
    }
    if (isEditing) {
      console.log("saving edited:", editedCategory);
      axios.put('inventory-api/categories/' + (categoryID === undefined ? "undefined_category_ID" : categoryID), editedCategory).then((response) => {
        setEditing(false);
        console.log("edited category", response.data);
        setLoading(true);
      });
    }
  }, [setLoadedCategory, categoryID, isLoading, isEditing, editedCategory]);

  const handleClick = () => setLoading(true);
  const handleEditClick = () => setEditing(true);

  const onNameChange = (val: string) => {
    let e = { ...editedCategory };
    e.name = val.toString();
    setEditedCategory({ ...e });
  };
  return (
    <Container>
      <Row>
        <Col sm={4}>
          <LinkContainer to="/categories">
            <Button variant="secondary">Back</Button>
          </LinkContainer>
        </Col>
        <Col sm={4}>
          <h2>Category Details</h2>
        </Col>
        <Col sm={4}>
          <Button
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? handleClick : () => {
            }}
          >
            {isLoading ? 'Fetching Category…' : 'Refresh'}
          </Button>
        </Col>
      </Row>
      <Row>
        Requested category ID: {categoryID}
      </Row>
      <Row>
        <Col sm>
          {loadedCategory.id === -1 ? <>Loading...</> :
            <>
              <Form>
                <Form.Group controlId="editItem.id" as={Row}>
                  <Form.Label column sm="2">#</Form.Label>
                  <Col sm="10">
                    <Form.Control plaintext readOnly defaultValue={loadedCategory.id} />
                  </Col>
                </Form.Group>
                <Form.Group controlId="editItem.name" as={Row}>
                  <Form.Label column sm="2">Name</Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" placeholder={editedCategory.name} value={editedCategory.name} onChange={(e: any) => onNameChange(e.target.value)} />
                  </Col>
                </Form.Group>
              </Form>
              <b>Actions</b>
              <Button variant="danger">Delete</Button>

              <Button
                variant="warning"
                disabled={isEditing}
                onClick={!isEditing ? handleEditClick : () => { }}
              >
                {isEditing ? 'Editing...' : 'Save Edit'}
              </Button>
            </>
          }
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryDetails;