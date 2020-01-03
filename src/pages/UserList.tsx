import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Link, useRouteMatch, Switch, Route} from "react-router-dom";
import UserDetails from "./UserDetails";

const UserList = () => {
  let match  = useRouteMatch();
  return (
      <Switch>
        <Route path={`${match.path}/:userID`}>
          <UserDetails />
        </Route>
        <Route path={match.path}>{/* Fallback when no ID submitted */}
        <Container>
            <Row>
              <Col sm={12}>
                <h2>User List</h2>
              </Col>
            </Row>
              <Row>
                  <Col sm={4}>
                      <h3>Please select a user.</h3>
                  </Col>
                  <Col sm={8}>
                    <ul>
                        <li><Link to={`${match.url}/1`}>User 1</Link></li>
                        <li><Link to={`${match.url}/2`}>User 2</Link></li>
                    </ul>
                  </Col>
              </Row>
        </Container>
        </Route>
      </Switch>
  );
}

export default UserList