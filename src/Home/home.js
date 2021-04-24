import React from "react";
import { Link, Route, Switch } from "react-router-dom";
/*
A "Create Deck" button is shown and clicking it brings the user to the Create Deck screen.
Existing decks are each shown with the deck name, the number of cards, and a “Study,” “View,” and “Delete” button.
Clicking the “Study” button brings the user to the Study screen.
Clicking the “Edit” button brings the user to the Edit Deck screen.
Clicking the “Delete” button shows a warning message before deleting the deck.
*/
const deckId = 1;

function Home() {
  return (
    <div>
      <Link to="/decks/new">Create Deck</Link>
      <div className={"card"}>
        <div class="card-body">
          <h5 class="card-title">Card title</h5>

          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          
          <Link to={`/decks/${deckId}/study`}>Study</Link>
          <Link to={`/decks/${deckId}/edit`}>Edit</Link>
          <Link to="#">Delete</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
