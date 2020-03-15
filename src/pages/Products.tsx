import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";


const Products = () => {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/:productID`}>
        <ProductDetails />
      </Route>
      <Route path={match.path}>{/* Fallback when no ID submitted */}
        <ProductList />
      </Route>
    </Switch>

  );
};

export default Products;