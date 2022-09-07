import React from "react";

function ResultsDisplay({ visibility, dispatch, correctIncorrect }) {
  return (
    <>
      <div
        onClick={() => {
          dispatch({ type: "CLOSE" });
        }}
        className={`black-bg ${visibility}`}
      ></div>
      <div className={`block ${visibility}`}>
        <p>Correct: {correctIncorrect.correct}</p>
        <p>Incorrect: {correctIncorrect.incorrect}</p>
        <button onClick={() => dispatch({ type: "CLOSE" })}>Close</button>
      </div>
    </>
  );
}

export default ResultsDisplay;
