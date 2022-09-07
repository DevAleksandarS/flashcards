import React, { useState, useReducer, useImperativeHandle } from "react";
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
    case "RESET":
      return {
        currentQuestion: 1,
        question: action.payload[state.currentQuestion].question,
        answer: action.payload[state.currentQuestion].answer,
        correct: 0,
        incorrect: 0,
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
        question: state.question,
        answer: state.answer,
        correct: state.correct++,
        incorrect: state.incorrect,
      };
    case "INCORRECT_ANSWER":
      return {
        currentQuestion: state.currentQuestion,
        question: state.question,
        answer: state.answer,
        correct: state.correct,
        incorrect: state.incorrect++,
      };
    default:
      return state;
  }
};

function FlashCards(
  { cards, visibility, appDispatch, getCorrectIncorrect, displayResultsBlock },
  ref
) {
  useImperativeHandle(ref, () => {
    return {
      updateCurrentQuestion: () => {
        dispatch({ type: "CURRENT_QUESTION" });
        dispatch({ type: "UPDATE_CURRENT_QUESTION", payload: cards });
      },
      reset: () => {
        dispatch({ type: "RESET", payload: cards });
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

  const [answerReveal, setAnswerReveal] = useState("0");

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
        <button
          onClick={() =>
            answerReveal === "0"
              ? setAnswerReveal("190px")
              : setAnswerReveal("0")
          }
          className="btn-answer"
        >
          Answer
          <BiChevronDown />
        </button>
        <div
          className="answer-block"
          style={{ width: "100%", height: answerReveal }}
        >
          {state.answer}
        </div>

        <button
          onClick={() => {
            if (state.currentQuestion < cards.length - 1) {
              setAnswerReveal("0");
              dispatch({ type: "CURRENT_QUESTION" });
              dispatch({ type: "UPDATE_CURRENT_QUESTION", payload: cards });
            }
            if (state.currentQuestion == cards.length - 1) {
              getCorrectIncorrect(state.correct, state.incorrect);
              displayResultsBlock();
            }
          }}
          onMouseDown={() => dispatch({ type: "CORRECT_ANSWER" })}
          className="btn"
        >
          Correct
        </button>
        <button
          onClick={() => {
            if (state.currentQuestion < cards.length - 1) {
              setAnswerReveal("0");
              dispatch({ type: "CURRENT_QUESTION" });
              dispatch({ type: "UPDATE_CURRENT_QUESTION", payload: cards });
            }
            if (state.currentQuestion == cards.length - 1) {
              getCorrectIncorrect(state.correct, state.incorrect);
              displayResultsBlock();
            }
          }}
          onMouseDown={() => dispatch({ type: "INCORRECT_ANSWER" })}
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
