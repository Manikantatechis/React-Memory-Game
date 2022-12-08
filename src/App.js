import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/singleCard";

function App() {
  const cardImages = [
    { src: "/img/helmet-1.png", matched: false },
    { src: "/img/potion-1.png", matched: false },
    { src: "/img/ring-1.png", matched: false },
    { src: "/img/scroll-1.png", matched: false },
    { src: "/img/shield-1.png", matched: false },
    { src: "/img/sword-1.png", matched: false },
  ];

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: parseInt(Math.random() * 100) }));

    setCards(shuffledCards);
    setTurns(0);
  };
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      setTurns((prevTurns) => prevTurns + 1);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setChoiceOne(null);
        setChoiceTwo(null);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setChoiceOne(null);
          setChoiceTwo(null);
          setDisabled(false);
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <h1>Turns: {turns}</h1>
      <div className="card-grid">
        {cards.map((card) => (
          <>
            <SingleCard
              card={card}
              handleChoice={handleChoice}
              disabled={disabled}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
