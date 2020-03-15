import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { LinkContainer } from "react-router-bootstrap";
import User from "../datatypes/User";

const Register = () => {
  const [isAddingNewUser, setIsAddingNewUser] = useState(false);
  const [hasAddedNewUser, setHasAddedNewUser] = useState(false);
  const [apiError, setApiError] = useState("");
  const [newUser, setNewUser] = useState<User>({
    id: -1,
    lastname: "reg_default_lastname",
    firstname: "reg_default_firstname",
    username: "reg_default_username",
    password: "reg_default_password",
    role: {
      id: 0,
      typ: "user",
      level: 1   // 0=admin, 1=user
    }
  });

  useEffect(() => {
    if (isAddingNewUser) {
      const newUserFormatted = {
        'username': newUser.username,
        'firstname': newUser.firstname,
        'lastname': newUser.lastname,
        'password': newUser.password,
        'roleLevel': newUser.role.level
      };
      console.log("registering new user:", newUser, newUserFormatted);
      axios.post('user-api/users/', newUserFormatted).then((response) => {
        setIsAddingNewUser(false);
        console.log("registered new user", response.data);
        setHasAddedNewUser(true);
      }).catch((reason: AxiosError) => {
        setIsAddingNewUser(false);
        console.log("registration error:", reason.message, reason.response);
        if (reason.response !== undefined && reason.response.status === 400) {
          // Handle 400
          setApiError(reason.response.data);
        } else {
          // Handle else
        }
      });
    }
  }, [isAddingNewUser, newUser, setNewUser, setHasAddedNewUser, setApiError]);

  const handleRegisterClick = () => setIsAddingNewUser(true);

  const onUsernameChange = (val: string) => {
    let e = { ...newUser };
    e.username = val.toString();
    setNewUser({ ...e });
  };
  const onFirstnameChange = (val: string) => {
    let e = { ...newUser };
    e.firstname = val.toString();
    setNewUser({ ...e });
  };
  const onLastnameChange = (val: string) => {
    let e = { ...newUser };
    e.lastname = val.toString();
    setNewUser({ ...e });
  };
  const onPasswordChange = (val: string) => {
    let e = { ...newUser };
    e.password = val.toString();
    setNewUser({ ...e });
  };

  if (hasAddedNewUser) {
    return (<Redirect to='/?justRegistered=True' />);
  } else {
    return (
      <Container>
        <Row>
          <Col sm={4}>
            <LinkContainer to="/">
              <Button variant="secondary">Back</Button>
            </LinkContainer>
          </Col>
          <Col sm={4}>
            <h2>Register new User</h2>
          </Col>
          <Col sm={4}>
          </Col>
        </Row>
        <Form>
          <Row>
            <Col sm>
              <Form.Group controlId="editItem.username" as={Row}>
                <Form.Label column sm="2">Username</Form.Label>
                <Col sm="10">
                  <Form.Control type="text" placeholder={newUser.username} value={newUser.username}
                    onChange={(e: any) => onUsernameChange(e.target.value)} />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group controlId="editItem.firstname" as={Row}>
                <Form.Label column sm="4">Firstname</Form.Label>
                <Col sm="8">
                  <Form.Control type="text" placeholder={newUser.firstname} value={newUser.firstname}
                    onChange={(e: any) => onFirstnameChange(e.target.value)} />
                </Col>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="editItem.lastname" as={Row}>
                <Form.Label column sm="4">Lastname</Form.Label>
                <Col sm="8">
                  <Form.Control type="text" placeholder={newUser.lastname} value={newUser.lastname}
                    onChange={(e: any) => onLastnameChange(e.target.value)} />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm>
              <Form.Group controlId="editItem.password" as={Row}>
                <Form.Label column sm="2">Password</Form.Label>
                <Col sm="10">
                  <Form.Control type="password" placeholder={newUser.password} value={newUser.password}
                    onChange={(e: any) => onPasswordChange(e.target.value)} />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        {apiError === "" ? <></> :
          <Row>
            <Col sm={12}>
              <Alert variant="danger">{apiError}</Alert>
            </Col>
          </Row>
        }
        <Row>
          <Col sm>
            <Button
              variant="warning"
              disabled={isAddingNewUser}
              onClick={!isAddingNewUser ? handleRegisterClick : () => {
              }}
            >
              {isAddingNewUser ? 'Registering...' : 'Register'}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default Register;