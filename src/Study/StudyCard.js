import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

export default function StudyCard({ deck }) {
  const [currentCard, setCurrentCard] = useState();
  const [isflipped, setIsFlipped] = useState(false);
  const history = useHistory();
  const nextBtn = isflipped ? (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => handleNextClick()}
    >
      Next
    </button>
  ) : null;

  const triggerModal = () => {
    const message =
      "Restart cards?\n\nClick 'cancel' to return to the home page.";
    if (window.confirm(message)) {
      setIsFlipped(false);
      setCurrentCard(deck.cards[0]);
    } else {
      history.push("/");
    }
  };

  const handleFlipClick = () => {
    setIsFlipped(!isflipped);
  };

  const handleNextClick = () => {
    const nextCardIndex = deck.cards.indexOf(currentCard) + 1;
    if (nextCardIndex === deck.cards.length) {
      triggerModal();
    } else {
      setCurrentCard(deck.cards[nextCardIndex]);
      setIsFlipped(false);
    }
  };

  // Set Current Card
  useEffect(() => {
    if (deck) {
      setCurrentCard(deck.cards[0]);
    }
  }, [deck]);

  if (currentCard) {
    const cardText = isflipped ? currentCard.back : currentCard.front;
    return (
      <div className="card mb-5">
        <div className="card-body">
          <h5 className="card-title">
            Card {deck.cards.indexOf(currentCard) + 1} of {deck.cards.length}
          </h5>
          <p className="card-text">{cardText}</p>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={() => handleFlipClick()}
          >
            Flip
          </button>
          {nextBtn}
        </div>
      </div>
    );
  } else {
    return <h5>Loading Card...</h5>;
  }
}
