import React, {useEffect, useState} from "react";
import {Button, ButtonToolbar, Col, Container, Row} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import User from "../datatypes/User";

const UserDetails = () => {
  let { userID } = useParams();

  const [isLoading, setLoading] = useState(true); //true=fetch from api onload, false=only on button click
  const [loadedUser, setLoadedUser] = useState<User>({
        id: -1,
        lastname: "-",
        firstname: "-",
        username: "-",
        password: "-",
        role: {
          id: -1,
          typ: "-",
          level: -1
        }
    });


    useEffect(() => {
        if (isLoading) {
            axios.get('http://bestwebshop.tech:9201/user-api/users/'+(userID === undefined ? "undefined_user_ID" : userID)).then((response) => {
                setLoading(false);
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
                setLoadedUser(loadedUser);
            });
        }
    }, [setLoadedUser, userID, isLoading]);

    const handleClick = () => setLoading(true);

  return (
      <Container>
        <Row>
          <Col sm={12}>
            <h2>User Details</h2>
          </Col>
        </Row>
          <Row>
              Requested user ID: {userID}
          </Row>
          <Row>
              <Col sm={2}>
                  <Button
                        variant="primary"
                        disabled={isLoading}
                        onClick={!isLoading ? handleClick : () => {
                        }}
                    >
                        {isLoading ? 'Fetching User…' : 'Refresh'}
                    </Button>
              </Col>
              <Col sm={10}>
                  {loadedUser.id === -1 ? <>Loading...</> :
                      <>
                          <b>#</b> {loadedUser.id} <br/>
                          <b>Lastname, Firstname</b> {loadedUser.lastname}, {loadedUser.firstname} <br/>
                          <b>Username</b> {loadedUser.username} <br/>
                          <b>Password</b> {loadedUser.password} <br/>
                          <b>Role</b> <Link to={"/roles/"+loadedUser.role.id}>{loadedUser.role.typ}</Link> (Level {loadedUser.role.level}) <br/>
                          <b>Actions</b>
                          <ButtonToolbar>
                              <Button variant="secondary">Change Role</Button>
                              <Button variant="danger">Delete</Button>
                          </ButtonToolbar>
                      </>
                      }
              </Col>
          </Row>
      </Container>
  );
}

export default UserDetails