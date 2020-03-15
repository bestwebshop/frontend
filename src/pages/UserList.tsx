import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";

const UserList = () => {
  let match = useRouteMatch();
  return (
    <Container>
      <Row>
        <Col sm={12}>
          <h2>User List</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <h3>Please select a user.</h3>
                      List of Users is not supported by Api, so take this hard coded ID list:
                  </Col>
        <Col sm={8}>
          <ul>
            <li><Link to={`${match.url}/1`}>User 1</Link></li>
            <li><Link to={`${match.url}/2`}>User 2</Link></li>
            <li><Link to={`${match.url}/3`}>User 3</Link></li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default UserList;