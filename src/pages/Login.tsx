import React, {useEffect, useState} from "react";
import {Alert, Button, ButtonToolbar, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import User from "../datatypes/User";
import axios from "axios";

const Login = (props:{logUser:User, setLogUser:Function}) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: ""
  });

  let logUser = props.logUser;
  let setLogUser = props.setLogUser;

  useEffect(() => {
      if (isLoggingIn) {
        console.log("Logging in with",loginDetails)
        /*setIsLoggingIn(false);
        let u:User = {
          id: 89,
          lastname: "auth",
          firstname: "user",
          username: loginDetails.username,
          password: loginDetails.password,
          role: {
            id: -1,
            typ: "-",
            level: -1
          }
        };
        setLogUser(u);*/
          axios.post('http://bestwebshop.tech:9201/user-api/session/',loginDetails).then((response) => {
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
          });
      }
  }, [setLogUser, logUser, isLoggingIn]);

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
                    <Form.Control type="text" placeholder="Username" value={loginDetails.username} onChange={(e:any) => onUsernameChange(e.target.value)}/>
                  </InputGroup>
                </Col>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="password" placeholder="Password" value={loginDetails.password} onChange={(e:any) => onPasswordChange(e.target.value)}/>
              </InputGroup>
            </Col>
            <Col sm={2}>
               <Button
                  variant="primary"
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