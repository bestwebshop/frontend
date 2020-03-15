import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import CategoryList from "./CategoryList";
import CategoryDetails from "./CategoryDetails";


const Categories = () => {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/:categoryID`}>
        <CategoryDetails />
      </Route>
      <Route path={match.path}>{/* Fallback when no ID submitted */}
        <CategoryList />
      </Route>
    </Switch>

  );
};

export default Categories;