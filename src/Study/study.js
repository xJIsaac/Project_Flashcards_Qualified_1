import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";

export default function Study() {
  const deckId = useParams().deckId;
  const [deck, setDeck] = useState();
  const [currentCard, setCurrentCard] = useState();
  const [isflipped, setIsFlipped] = useState(false);
  const history = useHistory();
  const NextBtn = () => {
    if (isflipped) {
      return (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleNextClick()}
        >
          Next
        </button>
      );
    }
    return null;
  };
  const CardText = () => {
    if (currentCard) {
      return isflipped ? currentCard.back : currentCard.front;
    }
  };
  const CardBody = () => {
    if (deck.cards.length <= 2) {
      return (
        <div>
          <h2>Not enough cards.</h2>
          <p>
            You need at least 3 cards to study. There are {deck.cards.length}{" "}
            cards in this deck.
          </p>
          <Link to="/decks/new">
            <button type="button" className="btn btn-primary mb-5">
              <i className="bi bi-plus-square mr-2"></i>
              Add Card
            </button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="card mb-5">
          <div className="card-body">
            <h5 className="card-title">
              Card {deck.cards.indexOf(currentCard) + 1} of {deck.cards.length}
            </h5>
            <p className="card-text">
              <CardText />
            </p>
            <button
              type="button"
              className="btn btn-secondary mr-2"
              onClick={() => handleFlipClick()}
            >
              Flip
            </button>
            {<NextBtn />}
          </div>
        </div>
      );
    }
  };

  const handleFlipClick = () => {
    setIsFlipped(!isflipped);
  };

  const handleNextClick = () => {
    const nextCard = deck.cards[deck.cards.indexOf(currentCard) + 1];
    setCurrentCard(nextCard);
    setIsFlipped(!isflipped);
  };

  // Set Deck
  useEffect(() => {
    const abortCtrl = new AbortController();
    readDeck(deckId, abortCtrl.signal).then((data) => {
      setDeck(data);
    });
    return () => {
      console.log("cleanup", deckId);
      abortCtrl.abort();
    };
  }, [deckId]);

  // Set Current Card
  useEffect(() => {
    if (deck) {
      setCurrentCard(deck.cards[0]);
      //console.log("current card set");
    }
  }, [deck]);

  // Modal Trigger
  useEffect(() => {
    if (
      currentCard &&
      deck.cards.indexOf(currentCard) + 1 === deck.cards.length &&
      isflipped
    ) {
      setTimeout(() => {
        const message =
          "Restart cards?\n\nClick 'cancel' to return to the home page.";
        if (window.confirm(message)) {
          setCurrentCard(deck.cards[0]);
          setIsFlipped(false);
        } else {
          history.push("/");
        }
      }, 1000);
    }
  });

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
      <CardBody />
    </div>
  );
}
