import React, { useState, useEffect } from "react";
import FlashCardsDisplay from "./FlashCardsDisplay";

function FlashCards({ cards, visibility, dispatch }) {
  let [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <>
      <div
        onClick={() => {
          dispatch({ type: "CLOSE" });
        }}
        className={`black-bg ${visibility}`}
      ></div>
      <div className={`block ${visibility}`}>
        <FlashCardsDisplay currentQuestion={currentQuestion} cards={cards} />
        <button
          onClick={(e) => {
            e.preventDefault();
            setCurrentQuestion(currentQuestion++);
          }}
          className="btn"
        >
          Correct
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setCurrentQuestion(currentQuestion++);
          }}
          className="btn margin-l"
        >
          Incorrect
        </button>
        <button
          onClick={() => {
            dispatch({ type: "CLOSE" });
          }}
          className="btn margin-l"
        >
          Close
        </button>
      </div>
    </>
  );
}

export default FlashCards;
