import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

const OAuthRedirectEndpoint = () => {
  return (
      <Container>
        <Row>
          <Col sm={12}>
            <h2>Redirecting to...</h2>
            Authorization Code Grant Type Step 5

          </Col>
        </Row>
          <Row>
              <Col>
                  <LinkContainer to="/oauth/token?grant_type=authorization_code&client_id=bestwebshop.tech&client_secret=XXXXS&code=XXXXAUTHCODEXXX&redirect_uri=http://bestwebshop.tech/OAuthRedirectEndpoint">
              <Button variant="primary">Redirect</Button>
            </LinkContainer>
              </Col>
          </Row>
      </Container>
  );
}

export default OAuthRedirectEndpoint