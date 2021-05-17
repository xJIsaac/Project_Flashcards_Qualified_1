import React from "react";

export default function Form(props) {
  const {
    submitHandler,
    cancelHandler,
    handleFrontChange,
    handleBackChange,
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
            name="cardFront"
            rows="2"
            placeholder="Front side of card"
            onChange={handleFrontChange}
            value={cardFront}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="cardBack">Back</label>
          <textarea
            className="form-control"
            id="cardBack"
            name="cardBack"
            rows="2"
            placeholder="Back side of card"
            onChange={handleBackChange}
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
      ;
    </div>
  );
}
