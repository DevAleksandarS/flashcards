import React from "react";
import { BiDownArrowAlt } from "react-icons/bi";

function FlashCardsDisplay({ currentQuestion, cards }) {
  const cardCheck = () => {
    if (cards.length > 0) {
      return true;
    }

    return false;
  };

  return (
    <>
      <p className="p">Question:</p>
      <p className="p">{cardCheck() ? cards[currentQuestion].question : ""}</p>
      <button className="sa-btn">
        Show Answer <BiDownArrowAlt />
      </button>
    </>
  );
}

export default FlashCardsDisplay;
