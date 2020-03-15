import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import LoadUserButton from "./LoadUserButton";
import UserCard from "./UserCard";

const UserDetails_Old = () => {
  let { userID } = useParams();

  const [userApiResp, setUserApiResp] = useState({
    id: 0,
    lastname: "placeholder",
    firstname: "tim",
    username: "tpl",
    password: "paswd",
    role: {
      id: 1,
      typ: "testuser",
      level: 1
    }
  });

  return (
    <Container>
      <Row>
        <Col sm={12}>
          <h2>User Details</h2>
        </Col>
      </Row>
      <Row>
        <Col sm>
          Requested user ID: {userID}
        </Col>
      </Row>
      <Row>
        <Col sm={2}>
          <LoadUserButton userApiResp={setUserApiResp} userID={parseInt(userID === undefined ? "" : userID)} />
        </Col>
        <Col sm={10}>
          <UserCard show_user={userApiResp} />
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetails_Old;