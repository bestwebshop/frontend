import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import UserDetails from "./UserDetails";
import UserList from "./UserList";

const Users = () => {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/:userID`}>
        <UserDetails />
      </Route>
      <Route path={match.path}>{/* Fallback when no ID submitted */}
        <UserList />
      </Route>
    </Switch>
  );
};

export default Users;