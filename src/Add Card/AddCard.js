import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { createCard, readDeck } from "../utils/api/index.js";
import AddCardBreadcrumb from "./AddCardBreadcrumb.js";

export default function CreateDeck() {
  const params = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState();
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const handleFrontChange = (event) => setCardFront(event.target.value);
  const handleBackChange = (event) => setCardBack(event.target.value);
  const handleSave = (event) => {
    event.preventDefault();
    const card = { front: cardFront, back: cardBack };
    createCard(deck.id, card).then((data) => {
      setCardFront("");
      setCardBack("");
    });
  };
  const handleDoneClick = () => {
    history.push(`/decks/${deck.id}`);
  };

  // Load Deck
  useEffect(() => {
    readDeck(params.deckId).then((data) => {
      setDeck(data);
    });
  }, [params.deckId]);

  if (deck) {
    return (
      <div className="mb-5">
        <AddCardBreadcrumb deck={deck} />
        <h4>{`${deck.name}: Add Card`}</h4>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="cardFront">Front</label>
            <textarea
              className="form-control"
              id="cardFront"
              name="cardFront"
              rows="2"
              placeholder="Front side of card"
              onChange={handleFrontChange}
              value={cardFront}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="cardBack">Back</label>
            <textarea
              className="form-control"
              id="cardBack"
              name="cardCack"
              rows="2"
              placeholder="Back side of card"
              onChange={handleBackChange}
              value={cardBack}
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={handleDoneClick}
          >
            Done
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  } else {
    return <h2>Loading Deck...</h2>;
  }
}
