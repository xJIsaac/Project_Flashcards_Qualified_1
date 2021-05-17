import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { createCard, readDeck } from "../utils/api/index.js";
import CardForm from "../Forms/CardForm.js";
import AddCardBreadcrumb from "./AddCardBreadcrumb.js";

export default function AddCard() {
  const params = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ name: "" });
  const [card, setCard] = useState({ front: "", back: "" });

  const handleCardChange = (event) => {
    setCard({
      ...card,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = (event) => {
    event.preventDefault();
    createCard(deck.id, { front: card.front, back: card.back }).then((data) => {
      setCard({ front: "", back: "" });
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

  return (
    <div className="mb-5">
      <AddCardBreadcrumb deck={deck} />
      <h4>{`${deck.name}: Add Card`}</h4>
      <CardForm
        submitHandler={handleSave}
        cancelHandler={handleDoneClick}
        handleCardChange={handleCardChange}
        submitBtnText="Save"
        cancelBtnText="Done"
        cardFront={card.front}
        cardBack={card.back}
      />
    </div>
  );
}
