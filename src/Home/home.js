import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index.js";
import DeckListItem from "./DeckListItem.js";
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

  const handleDeleteDeck = (id) => {
    const confirmMsg =
      "Delete this deck?\n\nYou will not be able to recover it.";
    if (window.confirm(confirmMsg)) {
      const abortCtrl = new AbortController();
      deleteDeck(id, abortCtrl.signal).then(() => {
        listDecks(abortCtrl.signal).then((data) => {
          setDecks(data);
        });
      });

      return () => {
        abortCtrl.abort();
      };
    }
  };

  return (
    <div>
      {/* Create Button */}
      <Link to="/decks/new">
        <button type="button" className="btn btn-secondary mb-3">
          <i className="bi bi-plus-square mr-2"></i>Create Deck
        </button>
      </Link>

      {/* List of Decks */}
      <div className="list-group mb-5">
        {decks.map((deck) => {
          return (
            <div key={deck.id}>
              <DeckListItem deck={deck} handleDeleteDeck={handleDeleteDeck} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
