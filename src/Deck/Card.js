import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  const { deck, card, handleDeleteCard } = props;

  return (
    <div>
      <div className="row">
        <div className="col-6">
          <p>{card.front}</p>
        </div>
        <div className="col-6">
          <p>{card.back}</p>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <div>
          <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
            <button type="button" className="btn btn-secondary mr-2">
              <i className="bi bi-pencil mr-2"></i>Edit
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDeleteCard(card.id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
