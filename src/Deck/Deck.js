import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api/index.js";
import CardList from "./CardList.js";

export default function Deck() {
  const history = useHistory();
  const [deck, setDeck] = useState();
  const deckId = useParams().deckId;
  const handleDeleteDeck = (id) => {
    const message = "Delete this deck?\n\nYou will not be able to recover it.";
    if (window.confirm(message)) {
      deleteDeck(deck.id).then(() => {
        history.push("/");
      });
    }
  };

  // Set Deck
  useEffect(() => {
    const abortCtrl = new AbortController();
    readDeck(deckId, abortCtrl.signal).then((data) => {
      setDeck(data);
    });
    return () => {
      abortCtrl.abort();
    };
  }, [deckId]);

  if (deck) {
    return (
      <div className="mb-5">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/"}>
                <i className="bi bi-house-door-fill mr-2"></i>Home
              </Link>
            </li>
            <li className="breadcrumb-item">{deck.name}</li>
          </ol>
        </nav>
        <h4>{deck.name}</h4>
        <p>{deck.description}</p>
        <div className="d-flex justify-content-between mb-4">
          <div>
            <Link to={`/decks/${deck.id}/edit`}>
              <button type="button" className="btn btn-secondary mr-2">
                <i className="bi bi-pencil mr-2"></i>Edit
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
              <button type="button" className="btn btn-primary mr-2">
                <i className="bi bi-book mr-2"></i>Study
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/cards/new`}>
              <button type="button" className="btn btn-primary">
                <i className="bi bi-plus-square mr-2"></i>
                Add Card
              </button>
            </Link>
          </div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDeleteDeck(deck.id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
        <h2>Cards</h2>
        <CardList deck={deck} />
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
