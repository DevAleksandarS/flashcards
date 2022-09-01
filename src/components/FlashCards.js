import React, { useRef } from "react";
import FlashCardsDisplay from "./FlashCardsDisplay";

function FlashCards({ cards, visibility, dispatch }) {
  const nextCardRef = useRef();

  return (
    <>
      <div
        onClick={() => {
          dispatch({ type: "CLOSE" });
        }}
        className={`black-bg ${visibility}`}
      ></div>
      <div className={`block ${visibility}`}>
        <FlashCardsDisplay ref={nextCardRef} cards={cards} />
        <button
          onClick={(e) => {
            e.preventDefault();
            nextCardRef.current.correctBtn();
          }}
          className="btn"
        >
          Correct
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            nextCardRef.current.incorrectBtn();
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
