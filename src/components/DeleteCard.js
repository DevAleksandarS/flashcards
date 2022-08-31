import React from "react";

function DeleteCard({ cards, visibility, dispatch }) {
  return (
    <>
      <div
        onClick={() => {
          dispatch({ type: "CLOSE" });
        }}
        className={`black-bg ${visibility}`}
      ></div>
      <div className={`block ${visibility}`}>
        <div className="delete-cards-block">
          <div className="card">
            <p className="p-q">Sta je zmija</p>
            <div className="line"></div>
            <button className="btn-delete">Delete</button>
          </div>
        </div>
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

export default DeleteCard;
