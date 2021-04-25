import React from "react";
import { Link } from "react-router-dom";

export default function DeckListItem(params) {
  const { deck, index, handleDeleteDeck } = params;
  const { id, name, cards, description } = deck;
  return (
    <div className="list-group-item" key={index}>
      <div className="d-flex justify-content-between">
        <h5>{name}</h5>
        <small>{cards.length} Cards</small>
      </div>
      <p>{description}</p>

      <div className="d-flex justify-content-between">
        <div>
          <Link to={`/decks/${id}/edit`}>
            <button type="button" className="btn btn-secondary mr-3">
              <i className="bi bi-pencil"></i> Edit
            </button>
          </Link>
          <Link to={`/decks/${id}/study`}>
            <button type="button" className="btn btn-primary">
              <i className="bi bi-book"></i> Study
            </button>
          </Link>
        </div>

        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDeleteDeck(id)}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
}
