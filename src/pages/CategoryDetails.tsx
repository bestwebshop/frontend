import React, {useEffect, useState} from "react";
import {Button, ButtonToolbar, Col, Container, Row} from "react-bootstrap";
import { useParams} from "react-router-dom";
import axios from "axios";
import Category from "../datatypes/Category";

const CategoryDetails = () => {
  let { categoryID } = useParams();

  const [isLoading, setLoading] = useState(true); //true=fetch from api onload, false=only on button click
  const [loadedCategory, setLoadedCategory] = useState<Category>({
        id: -1,
        name: "-"
    });


    useEffect(() => {
        if (isLoading) {
            axios.get('http://bestwebshop.tech:9205/categories/'+(categoryID === undefined ? "undefined_category_ID" : categoryID)).then((response) => {
                setLoading(false);
                let loadedCategory : Category = {
                    id: response.data.id,
                    name: response.data.name
                };
                setLoadedCategory(loadedCategory);
            });
        }
    }, [setLoadedCategory, categoryID, isLoading]);

    const handleClick = () => setLoading(true);

  return (
      <Container>
        <Row>
          <Col sm={12}>
            <h2>Category Details</h2>
          </Col>
        </Row>
          <Row>
              Requested category ID: {categoryID}
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
                  {loadedCategory.id === -1 ? <>Loading...</> :
                      <>
                        <b>#</b> {loadedCategory.id} <br/>
                        <b>Name</b> {loadedCategory.name} <br/>
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

export default CategoryDetails