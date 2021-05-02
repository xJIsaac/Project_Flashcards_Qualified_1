import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { readDeck, updateDeck } from "../utils/api/index.js";
import EditDeckBreadcrumb from "./EditDeckBreadcrumb.js";

export default function EditDeck() {
  const params = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState();
  const [deckName, setDeckName] = useState("");
  const [description, setDescription] = useState("");
  const handleDeckNameChange = (event) => setDeckName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck({ id: deck.id, name: deckName, description: description }).then(
      (data) => {
        history.push(`/decks/${data.id}`);
      }
    );
  };
  const handleCancel = () => {
    history.push(`/decks/${deck.id}`);
  };

  // Load Deck
  useEffect(() => {
    readDeck(params.deckId).then((data) => {
      setDeck(data);
    });
  }, [params.deckId]);

  // Pre-fill form
  useEffect(() => {
    if (deck) {
      setDeckName(deck.name);
      setDescription(deck.description);
    }
  }, [deck]);

  if (deck) {
    return (
      <div className="mb-5">
        <EditDeckBreadcrumb deck={deck}/>
        <h1>Edit Deck</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="deckName">Name</label>
            <input
              type="text"
              className="form-control"
              id="deckName"
              name="deckName"
              onChange={handleDeckNameChange}
              value={deckName}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              onChange={handleDescriptionChange}
              value={description}
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={handleCancel}
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
    return <h2>Loading deck...</h2>;
  }
}
