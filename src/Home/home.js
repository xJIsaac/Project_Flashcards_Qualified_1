import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api/index.js";
import DeckListItem from "./Decks List Item/deckslistitem.js";
/*
A "Create Deck" button is shown and clicking it brings the user to the Create Deck screen.
Existing decks are each shown with the deck name, the number of cards, and a “Study,” “View,” and “Delete” button.
Clicking the “Study” button brings the user to the Study screen.
Clicking the “Edit” button brings the user to the Edit Deck screen.
Clicking the “Delete” button shows a warning message before deleting the deck.
*/

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortCtrl = new AbortController();
    listDecks(abortCtrl.signal).then((data) => {
      setDecks(data);
    });

    return () => {
      abortCtrl.abort();
    };
  }, []);

  return (
    <div>
      {/* Create Button */}
      <div className="mb-3">
        <Link to="/decks/new">
          <button type="button" className="btn btn-secondary">
            <i className="bi bi-plus-circle"></i> Create Deck
          </button>
        </Link>
      </div>

      {/* List of Decks */}
      <div className="list-group mb-5">
        {decks.map((deck, index) => {
          return DeckListItem(deck, index);
        })}
      </div>
    </div>
  );
}

export default Home;
