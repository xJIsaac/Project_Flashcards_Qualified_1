import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";

export default function Study() {
  const [deck, setDeck] = useState();
  const [currentCard, setCurrentCard] = useState();
  const deckId = useParams().deckId;

  useEffect(() => {
    const abortCtrl = new AbortController();
    readDeck(deckId, abortCtrl.signal).then((data) => {
      setDeck(data);
    });
    return () => {
      console.log("cleanup", deckId);
      abortCtrl.abort(); // Cancels any pending request or response
    };
  }, [deckId]);

  useEffect(() => {
    if (deck) {
      setCurrentCard(deck.cards[0]);
    }
  }, [deck]);

  console.log("deck: ", deck);
  //console.log("cards: ", cards);
  console.log("currentCard: ", currentCard);

  if (deck === undefined || currentCard === undefined) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {/* Breadcrumb */}.
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>
              <i className="bi bi-house-door-fill"></i> Home
            </Link>
          </li>
          <li className="breadcrumb-item">{deck.name}</li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      {/* Study body */}
      <h1>Study: {deck.name}</h1>
      <div className="card mb-5">
        <div className="card-body">
          <h5 className="card-title">
            Card {deck.cards.indexOf(currentCard) + 1} of {deck.cards.length}
          </h5>
          <p className="card-text">{currentCard.front}</p>
          <button type="button" className="btn btn-secondary">
            Flip
          </button>
        </div>
      </div>
    </div>
  );
}
