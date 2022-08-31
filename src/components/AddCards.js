import React, { useReducer, useRef } from "react";

function AddCards({ addCard, visibility, dispatch }) {
  let questionRef = useRef("");
  let answerRef = useRef("");

  return (
    <>
      <div
        onClick={() => {
          dispatch({ type: "CLOSE" });
        }}
        className={`black-bg ${visibility}`}
      ></div>
      <div className={`block ${visibility}`}>
        <input
          className="question-input"
          type="text"
          placeholder="Question..."
          ref={questionRef}
        ></input>
        <textarea
          className="answer-input"
          placeholder="Input answer..."
          ref={answerRef}
        ></textarea>
        <button
          onClick={() => {
            addCard(questionRef.current.value, answerRef.current.value);
            questionRef.current.value = "";
            answerRef.current.value = "";
          }}
          className="btn"
        >
          Add
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

export default AddCards;
