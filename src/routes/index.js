import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

export const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/">
          <Redirect to="/welcome" />
        </Route>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};
