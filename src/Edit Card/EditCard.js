import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { readCard, readDeck, updateCard } from "../utils/api/index.js";
import CardForm from "../Forms/CardForm.js";
import EditCardBreadcrumb from "./EditCardBreadcrumb.js";

export default function EditCard() {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCard({
      id: card.id,
      front: card.front,
      back: card.back,
      deckId: deck.id,
    }).then((data) => {
      setCard({ front: "", back: "" });
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
      setCard({ front: card.front, back: card.back });
    }
  }, []);

  return (
    <div className="mb-5">
      <EditCardBreadcrumb deck={deck} card={card} />
      <h3>Edit Card</h3>
      <CardForm
        submitHandler={handleSubmit}
        cancelHandler={handleCancelClick}
        handleCardChange={handleCardChange}
        submitBtnText="Submit"
        cancelBtnText="Cancel"
        cardFront={card.front}
        cardBack={card.back}
      />
    </div>
  );
}
