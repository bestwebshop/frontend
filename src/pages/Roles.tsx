import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route, Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

const Roles = () => {
  let match = useRouteMatch();
  return (
    <Container>
      <Row>
        Role Lists or Details are not yet supported on the API.
        </Row>
      <Switch>
        <Route path={`${match.path}/:roleID`} render={({ match }) => (
          <Row>(Requested role ID: { match.params.roleID})</Row>
        )} />
        <Route path={match.path}>
          <Row>
            <Col sm={4}>
              take this hard coded ID list:
                  </Col>
            <Col sm={8}>
              <ul>
                <li><Link to={`${match.url}/1`}>Role 1</Link></li>
                <li><Link to={`${match.url}/2`}>Role 2</Link></li>
                <li><Link to={`${match.url}/3`}>Role 3</Link></li>
              </ul>
            </Col>
          </Row>
        </Route>
      </Switch>
    </Container>

  );
};

export default Roles;