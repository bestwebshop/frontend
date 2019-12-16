import React from "react";
import {Card, ListGroup} from "react-bootstrap";

class ProductListEntry extends React.Component<{children: JSX.Element[]}> {

  render() {
    return (
     <Card style={{ width: '18rem' }}>
      <Card.Header>Featured Products</Card.Header>
      <ListGroup variant="flush">
          {this.props.children}
      </ListGroup>
    </Card>
   );
  }

}
export default ProductListEntry

