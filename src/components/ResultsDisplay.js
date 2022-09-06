import React from "react";

function ResultsDisplay({ visibility, dispatch }) {
  return (
    <>
      <div
        onClick={() => {
          dispatch({ type: "CLOSE" });
        }}
        className={`black-bg ${visibility}`}
      ></div>
      <div className={`block ${visibility}`}></div>
    </>
  );
}

export default ResultsDisplay;
