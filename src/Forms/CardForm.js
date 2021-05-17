import React from "react";

export default function CardForm(props) {
  const {
    submitHandler,
    cancelHandler,
    handleCardChange,
    submitBtnText,
    cancelBtnText,
    cardFront,
    cardBack,
  } = props;

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="cardFront">Front</label>
          <textarea
            className="form-control"
            id="cardFront"
            name="front"
            rows="2"
            placeholder="Front side of card"
            onChange={handleCardChange}
            value={cardFront}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="cardBack">Back</label>
          <textarea
            className="form-control"
            id="cardBack"
            name="back"
            rows="2"
            placeholder="Back side of card"
            onChange={handleCardChange}
            value={cardBack}
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={cancelHandler}
        >
          {cancelBtnText}
        </button>
        <button type="submit" className="btn btn-primary">
          {submitBtnText}
        </button>
      </form>
    </div>
  );
}
