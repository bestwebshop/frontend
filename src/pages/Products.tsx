import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";
import User from "../datatypes/User";

const Products = (props: { loggedInUser: User; }) => {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/:productID`}>
        <ProductDetails loggedInUser={props.loggedInUser} />
      </Route>
      <Route path={match.path}>{/* Fallback when no ID submitted */}
        <ProductList loggedInUser={props.loggedInUser} />
      </Route>
    </Switch>

  );
};

export default Products;