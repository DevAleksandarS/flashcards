import React, { useReducer, useImperativeHandle } from "react";
import { BiChevronDown } from "react-icons/bi";

const reducer = (state, action) => {
  switch (action.type) {
    case "CURRENT_QUESTION":
      return {
        currentQuestion: state.currentQuestion++,
        question: state.question,
        answer: state.answer,
        correct: state.correct,
        incorrect: state.incorrect,
      };
    case "UPDATE_CURRENT_QUESTION":
      return {
        currentQuestion: state.currentQuestion,
        question: action.payload[state.currentQuestion].question,
        answer: action.payload[state.currentQuestion].answer,
        correct: state.correct,
        incorrect: state.incorrect,
      };
    case "CORRECT_ANSWER":
      return {
        currentQuestion: state.currentQuestion,
        question: action.payload[state.currentQuestion].question,
        answer: action.payload[state.currentQuestion].answer,
        correct: state.correct++,
        incorrect: state.incorrect,
      };
    case "INCORRECT_ANSWER":
      return {
        currentQuestion: state.currentQuestion,
        question: action.payload[state.currentQuestion].question,
        answer: action.payload[state.currentQuestion].answer,
        correct: state.correct,
        incorrect: state.incorrect++,
      };
    default:
      return state;
  }
};

function FlashCards({ cards, visibility, appDispatch }, ref) {
  useImperativeHandle(ref, () => {
    return {
      updateCurrentQuestion: () => {
        dispatch({ type: "CURRENT_QUESTION" });
        dispatch({ type: "UPDATE_CURRENT_QUESTION", payload: cards });
      },
    };
  });

  const [state, dispatch] = useReducer(reducer, {
    currentQuestion: 0,
    question: cards[0].question,
    answer: cards[0].answer,
    correct: 0,
    incorrect: 0,
  });

  return (
    <>
      <div
        onClick={() => {
          appDispatch({ type: "CLOSE" });
        }}
        className={`black-bg ${visibility}`}
      ></div>
      <div className={`block ${visibility}`}>
        <p className="p">Question:</p>
        <p className="p">{state.question}</p>
        <div className="line"></div>
        <button className="btn-answer">
          Answer
          <BiChevronDown />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            if (state.currentQuestion < cards.length - 1) {
              dispatch({ type: "CURRENT_QUESTION" });
              dispatch({ type: "CORRECT_ANSWER", payload: cards });
            }
            if (state.currentQuestion == cards.length - 1) {
              console.log(state.currentQuestion);
              console.log(cards.length);
            }
          }}
          className="btn"
        >
          Correct
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (state.currentQuestion < cards.length - 1) {
              dispatch({ type: "CURRENT_QUESTION" });
              dispatch({ type: "INCORRECT_ANSWER", payload: cards });
            }
          }}
          className="btn margin-l"
        >
          Incorrect
        </button>
        <button
          onClick={() => {
            appDispatch({ type: "CLOSE" });
          }}
          className="btn margin-l"
        >
          Close
        </button>
      </div>
    </>
  );
}

export default React.forwardRef(FlashCards);
