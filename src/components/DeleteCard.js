import React from "react";

function DeleteCard({ cards, visibility, dispatch, deleteCard }) {
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
          {cards.map((card) => (
            <div className="card">
              <p className="p-q">{card.question}</p>
              <div className="line"></div>
              <button
                onClick={() => deleteCard(card.id)}
                className="btn-delete"
              >
                Delete
              </button>
            </div>
          ))}
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
