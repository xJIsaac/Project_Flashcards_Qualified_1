import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { readDeck } from "../utils/api/index.js";
import NotEnoughCards from "./NotEnoughCards.js";
import StudyBreadcrumb from "./StudyBreadcrumb.js";
import StudyCard from "./StudyCard.js";

export default function Study() {
  const [deck, setDeck] = useState();
  const deckId = useParams().deckId;

  // Set Deck
  useEffect(() => {
    readDeck(deckId).then((data) => {
      setDeck(data);
    });
  }, [deckId]);

  if (deck) {
    const body =
      deck.cards.length <= 2 ? (
        <NotEnoughCards deck={deck} />
      ) : (
        <StudyCard deck={deck} />
      );
    return (
      <div>
        <StudyBreadcrumb deck={deck} />
        <h1>Study: {deck.name}</h1>
        {body}
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
