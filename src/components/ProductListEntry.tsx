import React from 'react';
import {ListGroup} from "react-bootstrap";

class ProductListEntry extends React.Component<{name: string}> {

  render() {
    return (
     <ListGroup.Item>{this.props.name}</ListGroup.Item>
   );
  }

}
export default ProductListEntry