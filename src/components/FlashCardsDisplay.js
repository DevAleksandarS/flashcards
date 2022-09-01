import React, { useState, useImperativeHandle } from "react";
import { BiDownArrowAlt } from "react-icons/bi";

function FlashCardsDisplay({ cards }, ref) {
  let [currentQuestion, setCurrentQuestion] = useState(0);

  useImperativeHandle(
    ref,
    () => {
      return {
        correctBtn: () => setCurrentQuestion(currentQuestion++),
        incorrectBtn: () => setCurrentQuestion(currentQuestion++),
      };
    },
    []
  );

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

export default React.forwardRef(FlashCardsDisplay);
