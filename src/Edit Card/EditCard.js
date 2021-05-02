import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { readCard, readDeck, updateCard } from "../utils/api/index.js";
import EditCardBreadcrumb from "./EditCardBreadcrumb.js";

export default function EditCard() {
  const params = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState();
  const [card, setCard] = useState();
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const handleFrontChange = (event) => setCardFront(event.target.value);
  const handleBackChange = (event) => setCardBack(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    const cardUpdate = {
      id: card.id,
      front: cardFront,
      back: cardBack,
      deckId: deck.id,
    };
    updateCard(cardUpdate).then((data) => {
      setCardFront("");
      setCardBack("");
      history.push(`/decks/${deck.id}`);
    });
  };
  const handleCancelClick = () => {
    history.push(`/decks/${deck.id}`);
  };

  // Load Deck and Card
  useEffect(() => {
    readDeck(params.deckId).then((data) => {
      setDeck(data);
      readCard(params.cardId).then((data) => {
        setCard(data);
      });
    });
  }, [params.deckId, params.cardId]);

  // Pre-fill form
  useEffect(() => {
    if (card) {
      setCardFront(card.front);
      setCardBack(card.back);
    }
  }, [card]);

  if (deck && card) {
    return (
      <div className="mb-5">
        <EditCardBreadcrumb deck={deck} card={card} />
        <h3>Edit Card</h3>
        <form onSubmit={handleSubmit}>
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
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  } else {
    return <h2>Loading Card...</h2>;
  }
}
