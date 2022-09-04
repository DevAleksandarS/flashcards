import React, { useState, useReducer } from "react";
import uuid from "react-uuid";
import "./css/style.css";
import AddCards from "./components/AddCards";
import FlashCards from "./components/FlashCards";
import DeleteCard from "./components/DeleteCard";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CARDS_BLOCK":
      return {
        addCards: "visible",
        flashcards: "non-visible",
        deleteCard: "non-visible",
      };
    case "FLASHCARDS_BLOCK":
      return {
        addCards: "non-visible",
        flashcards: "visible",
        deleteCard: "non-visible",
      };
    case "DELETE_CARD_BLOCK":
      return {
        addCards: "non-visible",
        flashcards: "non-visible",
        deleteCard: "visible",
      };
    case "CLOSE":
      return {
        addCards: "non-visible",
        flashcards: "non-visible",
        deleteCard: "non-visible",
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, {
    addCards: "non-visible",
    flashcards: "non-visible",
    deleteCard: "non-visible",
  });

  const [cards, setCards] = useState([{ id: "", question: "", answer: "" }]);

  function addCard(question, answer) {
    setCards([...cards, { id: uuid(), question: question, answer: answer }]);
  }

  function deleteCard(id) {
    setCards(cards.filter((card) => card.id !== id));
  }

  return (
    <div className="App">
      <div className="btn-cont">
        <button
          onClick={() => {
            dispatch({ type: "ADD_CARDS_BLOCK" });
          }}
        >
          Add Cards
        </button>
        <button
          onClick={() => {
            if (cards.length <= 3) {
              alert("You need to create at least 4 cards!");
            } else {
              dispatch({ type: "FLASHCARDS_BLOCK" });
            }
          }}
        >
          Start Flashcards
        </button>
        <button
          onClick={() => {
            setCards([]);
          }}
        >
          Delete All Cards
        </button>
        <button
          onClick={() => {
            dispatch({ type: "DELETE_CARD_BLOCK" });
          }}
        >
          Delete Card
        </button>
      </div>

      <AddCards
        addCard={addCard}
        visibility={state.addCards}
        dispatch={dispatch}
      />
      <FlashCards
        cards={cards}
        visibility={state.flashcards}
        appDispatch={dispatch}
      />
      <DeleteCard
        cards={cards}
        visibility={state.deleteCard}
        dispatch={dispatch}
        deleteCard={deleteCard}
      />
    </div>
  );
}

export default App;
