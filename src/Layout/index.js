import React from "react";
import { Route, Switch } from "react-router";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/home.js";
import Study from "../Study/study.js";
import CreateDeck from "../Create Deck/createDeck.js";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact={true} path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact={true} path="/decks/new">
            <CreateDeck />
          </Route>
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
