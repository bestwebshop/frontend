import React from "react";
import { Badge, Card, ListGroup } from "react-bootstrap";
import KeyValueList from "../datatypes/KeyValueList";

const AutoList = (props: { kvlist: KeyValueList; }) => {

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>{props.kvlist.name}</Card.Header>
      <ListGroup variant="flush">
        {
          props.kvlist.list.map(item => (
            <ListGroup.Item className="d-flex justify-content-between align-items-center" key={item.key}>
              {item.key}
              <Badge variant="secondary">{item.value}</Badge>
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </Card>
  );
};

export default AutoList;

