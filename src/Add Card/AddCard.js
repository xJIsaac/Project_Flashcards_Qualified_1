import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { createCard, readDeck } from "../utils/api/index.js";
import Form from "../Form/Form.js";
import AddCardBreadcrumb from "./AddCardBreadcrumb.js";

export default function AddCard() {
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
        <Form
          submitHandler={handleSave}
          cancelHandler={handleDoneClick}
          handleFrontChange={handleFrontChange}
          handleBackChange={handleBackChange}
          submitBtnText="Save"
          cancelBtnText="Done"
          cardFront={cardFront}
          cardBack={cardBack}
        />
      </div>
    );
  } else {
    return <h2>Loading Deck...</h2>;
  }
}
