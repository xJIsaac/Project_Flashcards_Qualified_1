import React, { useEffect, useState } from "react";
import { deleteCard, listCards } from "../utils/api/index.js";
import Card from "./Card.js";

export default function CardList({ deck }) {
  const [cardList, setCardList] = useState();

  const handleDeleteCard = (cardId) => {
    const message = "Delete this card?\n\nYou will not be able to recover it.";
    if (window.confirm(message)) {
      const abortCtrl = new AbortController();
      deleteCard(cardId).then(() => {
        listCards(deck.id, abortCtrl.signal).then((data) => {
          setCardList(data);
        });
      });
      return () => {
        abortCtrl.abort();
      };
    }
  };

  useEffect(() => {
    setCardList(deck.cards);
  }, [deck.cards]);

  if (cardList) {
    return (
      <ul className="list-group">
        {cardList.map((card) => {
          return (
            <li className="list-group-item" key={card.id}>
              <Card
                deck={deck}
                card={card}
                handleDeleteCard={handleDeleteCard}
              />
            </li>
          );
        })}
      </ul>
    );
  } else {
    return <h3>Loading cards...</h3>;
  }
}
