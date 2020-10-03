import React from "react";
import "./App.css";
import { BrowserRouter,Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "./components/dashboard/index";
import Login from "./components/login/index";

function ProtectedRoute() {
  return (
    <BrowserRouter>
       <Switch>
       <Route
       exact
          path="/"
          component={Login}
        />
        <Route
          exact
          path="/dashboard"
          component={Dashboard}
        />
       
      </Switch>
      </BrowserRouter>
  );
}

export default ProtectedRoute;
