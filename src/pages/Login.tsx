import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import User from "../datatypes/User";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useLocation } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import GlobalSettings from "../GlobalSettings";

const Login = (props: { loggedInUser: User, setLoggedInUser: Function; }) => { //()
  const [isLegacyLoggingIn, setIsLegacyLoggingIn] = useState(false);
  const [legacyLoginDetails, setLegacyLoginDetails] = useState({
    username: "",
    password: ""
  });
  const [apiError, setApiError] = useState("");

  const loggedInUser = props.loggedInUser;
  const setLoggedInUser = props.setLoggedInUser;

  let calledPath = "/";
  const location = useLocation();
  calledPath = location.pathname;
  console.log("called from path", calledPath);

  const randomNrForState = Math.floor(Math.random() * 10000000) + 1; //random nr. between 1 snd 10.000.000  

  useEffect(() => {
    if (isLegacyLoggingIn) {
      console.log("Logging in with", legacyLoginDetails);
      axios.post('user-api/session/', legacyLoginDetails).then((response: AxiosResponse) => {
        setIsLegacyLoggingIn(false);
        let loadedUser: User = {
          id: response.data.id,
          lastname: response.data.lastname,
          firstname: response.data.firstname,
          username: response.data.username,
          password: response.data.password,
          role: {
            id: response.data.role.id,
            typ: response.data.role.typ,
            level: response.data.role.level
          }
        };
        setLoggedInUser(loadedUser);
        console.log("logged in via legacy method / user-api:", loadedUser);
      }).catch((reason: AxiosError) => {
        setIsLegacyLoggingIn(false);
        console.log("login error:", reason.message, reason.response);
        if (reason.response !== undefined && reason.response.status === 400) {
          // Handle 400
          let apiStr = "";
          if (reason.response.data.errors !== undefined) {
            reason.response.data.errors.forEach((e: any) => {
              apiStr += e.field + " " + e.defaultMessage + "<br/>";
            });
          }
          setApiError(apiStr + "(status " + reason.response.status + ")");
        } else if (reason.response !== undefined && reason.response.status === 404) {
          // Handle 404
          setApiError(reason.response.data + "(status " + reason.response.status + ")<br>Your password might be wrong");
        } else {
          // Handle else
        }
      });
    }
  }, [setLoggedInUser, loggedInUser, isLegacyLoggingIn, setIsLegacyLoggingIn, legacyLoginDetails, setApiError]);

  const handleLegacyLoginClick = () => setIsLegacyLoggingIn(true);
  const onUsernameChange = (val: string) => {
    let temp = { ...legacyLoginDetails };
    temp.username = val.toString();
    setLegacyLoginDetails({ ...temp });
  };
  const onPasswordChange = (val: string) => {
    let temp = { ...legacyLoginDetails };
    temp.password = val.toString();
    setLegacyLoginDetails({ ...temp });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Alert variant="info">
          You need to log in to use this webshop.
          </Alert>
      </Row>
      <Form>
        <Row><Col><h2>OAuth Login:</h2></Col></Row>
        <Row><Col>Authorization Code Grant Type Step 2</Col></Row>
        <Row>
          <Col>
            <a href={"http://" + GlobalSettings.hostname + ":9208/oauth/authorize?response_type=code&state=" + calledPath + "+++" + randomNrForState + "&client_id=webshop-webclient&scope=all.read%20all.write&redirect_uri=http://" + GlobalSettings.hostname + "/OAuthRedirectEndpoint"}>
              <Button variant="primary">OAuth Login</Button>
            </a>
          </Col>
        </Row>
        <Row><Col><h2>Register:</h2></Col></Row>
        <Row><Col>Register a new account</Col></Row>
        <Row>
          <Col>
            <LinkContainer to="/register">
              <Button variant="primary">Registration</Button>
            </LinkContainer>
          </Col>
        </Row>
        {/*{<Row>
              <Col>
                <OauthSender
                  authorizeUrl="http://"+GlobalSettings.hostname+":9201/auth/authorize"
                  clientId="webshop-webclient"
                  redirectUri="http://"+GlobalSettings.hostname+"/OAuthRedirectEndpoint"
                  state={{ from: calledPath }}
                  render={(url:any) =>
                      <a href={url}>Login using OAuth Module</a>
                    }
                />

              </Col>
                  </Row>*/}
        <Row><Col><h2>Legacy Login:</h2></Col></Row>
        {apiError === "" ? <></> :
          <Row>
            <Col sm={12}>
              <Alert variant="danger"><div dangerouslySetInnerHTML={{ __html: apiError }} /></Alert>
            </Col>
          </Row>
        }
        <Row>
          <Col sm={2}>
            Please Login:
            </Col>
          <Col sm={4}>
            <Form.Group controlId="editItem.name" >
              <Col sm="10">
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">User</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control type="text" placeholder="Username" autoComplete="username" value={legacyLoginDetails.username} onChange={(e: any) => onUsernameChange(e.target.value)} />
                </InputGroup>
              </Col>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="password" placeholder="Password" autoComplete="current-password" value={legacyLoginDetails.password} onChange={(e: any) => onPasswordChange(e.target.value)} />
            </InputGroup>
          </Col>
          <Col sm={2}>
            <Button
              variant="primary"
              type="submit"
              disabled={isLegacyLoggingIn}
              onClick={!isLegacyLoggingIn ? handleLegacyLoginClick : () => {
              }}
            >
              {isLegacyLoggingIn ? 'Logging in…' : 'Login'}
            </Button>
          </Col>
        </Row>
      </Form>


    </Container>
  );
};

export default Login;