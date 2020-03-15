import React from "react";
import { Badge, Card, ListGroup } from "react-bootstrap";
import User from "../datatypes/User";

const UserCard = (props: { show_user: User; }) => {

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>{props.show_user.username}</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item className="d-flex justify-content-between align-items-center" key="name">
          {props.show_user.firstname}
          <Badge variant="secondary">{props.show_user.role.typ}</Badge>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default UserCard;

