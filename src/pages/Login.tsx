import React, {useEffect, useState} from "react";
import {Alert, Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import User from "../datatypes/User";
import axios, {AxiosError, AxiosResponse} from "axios";
import {useLocation} from 'react-router-dom'; 
//import { OauthSender } from 'react-oauth-flow';

const Login = (props:{logUser:User, setLogUser:Function}) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: ""
  });

  let logUser = props.logUser;
  let setLogUser = props.setLogUser;
  let calledPath = "/";
  const location = useLocation();
  calledPath = location.pathname;
  console.log("called from path", calledPath)

  const randomNrForState = Math.floor(Math.random() * 10000000) + 1; //random nr. between 1 snd 10.000.000  

  useEffect(() => {
      if (isLoggingIn) {
        console.log("Logging in with",loginDetails)
          axios.post('user-api/session/',loginDetails).then((response: AxiosResponse) => {
              setIsLoggingIn(false);
              let loadedUser : User = {
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
              }
              setLogUser(loadedUser);
          }).catch((reason: AxiosError) => {
              setIsLoggingIn(false);
              console.log("login error", reason);
                if (reason.response !== undefined && reason.response.status === 400) {
                  // Handle 400
                } else {
                  // Handle else
                }
                console.log(reason.message)
          });
      }
  }, [setLogUser, logUser, isLoggingIn, setIsLoggingIn, loginDetails]);

    const handleLoginClick = () => setIsLoggingIn(true);
    const onUsernameChange = (val:string) => {
        let temp = { ...loginDetails};
        temp.username = val.toString();
        setLoginDetails({...temp});
    };
    const onPasswordChange = (val:string) => {
        let temp = { ...loginDetails};
        temp.password = val.toString();
        setLoginDetails({...temp});
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
                    <a href={"http://localhost:9201/auth/authorize?response_type=code&state="+calledPath+"+++"+randomNrForState+"&client_id=webshop-webclient&scope=all.read%20all.write&redirect_uri=http://localhost/OAuthRedirectEndpoint"}>
                      <Button variant="primary">OAuth Login</Button>
                    </a>
                </Col>
            </Row>
            {/*{<Row>
              <Col>
                <OauthSender
                  authorizeUrl="http://localhost:9201/auth/authorize"
                  clientId="webshop-webclient"
                  redirectUri="http://localhost/OAuthRedirectEndpoint"
                  state={{ from: calledPath }}
                  render={(url:any) =>
                      <a href={url}>Login using OAuth Module</a>
                    }
                />

              </Col>
                  </Row>*/}
            <Row><Col><h2>Legacy Login:</h2></Col></Row>
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
                    <Form.Control type="text" placeholder="Username" autoComplete="username" value={loginDetails.username} onChange={(e:any) => onUsernameChange(e.target.value)}/>
                  </InputGroup>
                </Col>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="password" placeholder="Password" autoComplete="current-password" value={loginDetails.password} onChange={(e:any) => onPasswordChange(e.target.value)}/>
              </InputGroup>
            </Col>
            <Col sm={2}>
               <Button
                  variant="primary"
                   type="submit"
                  disabled={isLoggingIn}
                  onClick={!isLoggingIn ? handleLoginClick : () => {
                  }}
               >
                  {isLoggingIn ? 'Logging in…' : 'Login'}
               </Button>
            </Col>
          </Row>
        </Form>


      </Container>
    );
}

export default Login