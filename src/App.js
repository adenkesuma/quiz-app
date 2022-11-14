import React from "react";
import './App.css';
import { useState, useEffect, useMemo } from 'react';
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import Start from "./components/Start";

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  const data = [
    {
      id:1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false
        },
        {
          text: "Watches",
          correct: true
        },
        {
          text: "Food",
          correct: false
        },
        {
          text: "Cosmetic",
          correct: false
        },
        
      ]
    },
    {
      id:2,
      question: "What is my name?",
      answers: [
        {
          text: "Aden",
          correct: true
        },
        {
          text: "Dino",
          correct: false
        },
        {
          text: "Rehan",
          correct: false
        },
        {
          text: "Fadjri",
          correct: false
        },
        
      ]
    },{
      id:3,
      question: "What is my hobbies?",
      answers: [
        {
          text: "Play a game",
          correct: false
        },
        {
          text: "Smoking",
          correct: false
        },
        {
          text: "drawing and reading a book",
          correct: true
        },
        {
          text: "run",
          correct: false
        },
        
      ]
    },
  ]

  const moneyPyramid = useMemo(() => 
    [
        {id:1, amount: "$ 100"},
        {id:2, amount: "$ 200"},
        {id:3, amount: "$ 300"},
        {id:4, amount: "$ 400"},
        {id:5, amount: "$ 500"},
        {id:6, amount: "$ 1000"},
        {id:7, amount: "$ 2000"},
        {id:8, amount: "$ 4000"},
        {id:9, amount: "$ 8000"},
        {id:10, amount: "$ 16000"},
        {id:11, amount: "$ 32000"},
        {id:12, amount: "$ 64000"},
        {id:13, amount: "$ 125000"},
        {id:14, amount: "$ 250000"},
        {id:15, amount: "$ 500000"},
      ].reverse(),
    []  
  );

  useEffect(() => {
    questionNumber > 1 && setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  return (
    <div className="app">
      {username ? (
        <>
          <div className="main">
          {stop ? (
            <h1 className="endText">You earned: {earned}</h1>
          ) : (
            <>
              <div className="top">
                <div className="timer">
                  <Timer setStop={setStop} questionNUmber={questionNumber}/>
                </div>
              </div>
              <div className="bottom">
                <Trivia 
                data={data} 
                setStop={setStop}
                setQuestionNumber={setQuestionNumber}
                questionNumber={questionNumber}/>
              </div>
            </>
          )}
        
          </div>
        <div className="pyramid">
          <ul className="moneyList">
            {
              moneyPyramid.map((m) => (
                <li className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}>
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))
            }
          </ul>
        </div>
        </>
      ) : <Start setUsername={setUsername} />}
    </div>
  );
}

export default App;
