import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { createDeck } from "../utils/api/index.js";

export default function CreateDeck() {
  const history = useHistory();
  const [deckName, setDeckName] = useState("");
  const [description, setDescription] = useState("");
  const handleDeckNameChange = (event) => setDeckName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    const deck = { name: deckName, description: description };
    createDeck(deck).then((data) => {
      setDeckName("");
      setDescription("");
      history.push(`/decks/${data.id}`);
    });
  };
  const handleCancel = () => {
    history.push("/");
  };

  return (
    <div className="mb-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>
              <i className="bi bi-house-door-fill mr-2"></i>Home
            </Link>
          </li>
          <li className="breadcrumb-item">Create Deck</li>
        </ol>
      </nav>
      <h1>Create Deck</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="deckName">Name</label>
          <input
            type="text"
            className="form-control"
            id="deckName"
            name="deckName"
            placeholder="Deck Name"
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
            placeholder="Brief description of the deck"
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
}
