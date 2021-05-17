import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { readCard, readDeck, updateCard } from "../utils/api/index.js";
import CardForm from "../Forms/CardForm.js";
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
        <CardForm
          submitHandler={handleSubmit}
          cancelHandler={handleCancelClick}
          handleFrontChange={handleFrontChange}
          handleBackChange={handleBackChange}
          submitBtnText="Submit"
          cancelBtnText="Cancel"
          cardFront={cardFront}
          cardBack={cardBack}
        />
      </div>
    );
  } else {
    return <h2>Loading Card...</h2>;
  }
}
