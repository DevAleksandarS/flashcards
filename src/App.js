import React, { useState, useReducer, useRef } from "react";
import uuid from "react-uuid";
import "./css/style.css";
import AddCards from "./components/AddCards";
import FlashCards from "./components/FlashCards";
import DeleteCard from "./components/DeleteCard";
import ResultsDisplay from "./components/ResultsDisplay";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CARDS_BLOCK":
      return {
        addCards: "visible",
        flashcards: "non-visible",
        deleteCard: "non-visible",
        resultsDisplay: "non-visible",
      };
    case "FLASHCARDS_BLOCK":
      return {
        addCards: "non-visible",
        flashcards: "visible",
        deleteCard: "non-visible",
        resultsDisplay: "non-visible",
      };
    case "DELETE_CARD_BLOCK":
      return {
        addCards: "non-visible",
        flashcards: "non-visible",
        deleteCard: "visible",
        resultsDisplay: "non-visible",
      };
    case "RESULTS_DISPLAY_BLOCK":
      return {
        addCards: "non-visible",
        flashcards: "non-visible",
        deleteCard: "non-visible",
        resultsDisplay: "visible",
      };
    case "CLOSE":
      return {
        addCards: "non-visible",
        flashcards: "non-visible",
        deleteCard: "non-visible",
        resultsDisplay: "non-visible",
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
    resultsDisplay: "non-visible",
  });

  const [cards, setCards] = useState([{ id: "", question: "", answer: "" }]);

  const [correctIncorrect, setCorrectIncorrect] = useState({
    correct: 0,
    incorrect: 0,
  });

  const btnRef = useRef();

  function addCard(question, answer) {
    setCards([...cards, { id: uuid(), question: question, answer: answer }]);
  }

  function deleteCardFunc(id) {
    setCards(cards.filter((card) => card.id !== id));
    btnRef.current.reset();
  }

  function getCorrectIncorrect(correct, incorrect) {
    setCorrectIncorrect({
      correct: correct,
      incorrect: incorrect,
    });
  }

  function displayResultsBlock() {
    dispatch({ type: "RESULTS_DISPLAY_BLOCK" });
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
              alert("You need to create at least 3 cards!");
            } else {
              btnRef.current.reset();
              btnRef.current.updateCurrentQuestion();
              dispatch({ type: "FLASHCARDS_BLOCK" });
            }
          }}
        >
          Start Flashcards
        </button>
        <button
          onClick={() => {
            setCards([{ id: "", question: "", answer: "" }]);
            btnRef.current.reset();
          }}
        >
          Delete All Cards
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
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
        getCorrectIncorrect={getCorrectIncorrect}
        displayResultsBlock={displayResultsBlock}
        ref={btnRef}
      />
      <DeleteCard
        cards={cards}
        visibility={state.deleteCard}
        dispatch={dispatch}
        deleteCardFunc={deleteCardFunc}
      />
      <ResultsDisplay
        visibility={state.resultsDisplay}
        dispatch={dispatch}
        correctIncorrect={correctIncorrect}
      />
    </div>
  );
}

export default App;
