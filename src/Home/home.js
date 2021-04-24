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
      <div class="mb-3">
        <Link to="/decks/new">
          <button type="button" class="btn btn-secondary">
            <i class="bi bi-plus-circle"></i> Create Deck
          </button>
        </Link>
      </div>
      <div class="card mb-3">
        <div class="card-body">
          <div class="mb-3">
            <h5 class="card-title">Card title</h5>

            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>

          <div class="d-flex justify-content-between">
            <div>
              <Link to={`/decks/${deckId}/edit`}>
                <button type="button" class="btn btn-secondary mr-3">
                  <i class="bi bi-pencil"></i> Edit
                </button>
              </Link>
              <Link to={`/decks/${deckId}/study`}>
                <button type="button" class="btn btn-primary">
                  <i class="bi bi-book"></i> Study
                </button>
              </Link>
            </div>
            <Link to="#">
              <button type="button" class="btn btn-danger">
                <i class="bi bi-trash"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
