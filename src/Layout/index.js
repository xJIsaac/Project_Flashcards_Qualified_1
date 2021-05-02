import React from "react";
import { Route, Switch } from "react-router";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/Home.js";
import Study from "../Study/Study.js";
import CreateDeck from "../Create Deck/CreateDeck.js";
import Deck from "../Deck/Deck.js";
import EditDeck from "../Edit Deck/EditDeck.js";
import AddCard from "../Add Card/AddCard.js";

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
          <Route exact={true} path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact={true} path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact={true} path="/decks/:deckId">
            <Deck />
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
