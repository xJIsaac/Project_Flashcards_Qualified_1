import React from "react";
import { Route, Switch } from "react-router";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/home.js"

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
