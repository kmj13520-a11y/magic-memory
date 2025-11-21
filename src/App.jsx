import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]); //카드들
  const [turns, setTurns] = useState(0); //턴수
  const [choiceOne, setChoiceOne] = useState(null); //선택된 카드1
  const [choiceTwo, setChoiceTwo] = useState(null); //선택된 카드2
  const [disabled, setDisabled] = useState(false); //카드 크릭 안되게 함

  //카드 선택시 기억하기
  function handleChoice(card) {
    //첫번째선택이 널이면 카드1에 저장, 아니면 카드2에 저장
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }
  //선택들을 비교하기(useEffect)
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        //카드매칭시 matched:true 변경
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        //console.log("맞췄네요.");
        resetTurn();
      } else {
        //console.log("틀렸네요.");
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //처음 게임은 자동시작
  useEffect(() => {
    shuffleCards();
  }, []);

  //턴+1, 선택카드 초기화
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1); //턴수 1증가
    setDisabled(false); //카드 클릭 다시 활성화
  };

  //카드 섞기
  const shuffleCards = () => {
    //카드 두세트 만들고 섞기(랜덤정렬) + id부여(map 랜덤번호)
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
  };
  console.log(cards, turns);
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            disabled={disabled}
          />
        ))}
      </div>
      <p>턴수:{turns}</p>
    </div>
  );
}

export default App;
