import React, { useState, useRef,useEffect, useReducer } from "react";
import "./style.css";
import Gamer from "./Gamer.js";
const initialState = 0;
const reducer = (state, action) => {
  switch (action) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "reset":
      return 0;
    default:
      throw new Error("Unexpected action");
  }
};
/**
 * Componente adivina la palabra
 */
export default function App() {
  const [totalAttempts, dispatch] = useReducer(reducer, initialState);
  const [word, setWord] = useState("");
  const [show, setShow] = useState(false);
  const [win, setWin] = useState(false);
  const inputGuess = useRef();
  const inputWord = useRef()
  // Añadir palabra
  const addWord = word => {
    setWord(word);
    // inputWord.current.value=''
  };

  useEffect(()=>{
  inputWord.current.value='';
  // inputGuess.current.value='';
  },[word])

  // Adivina la palabra
  const GuessWord = wordGuess => {
    if (word === wordGuess) {
      setWin(true);
      dispatch("reset");
    } else {
      dispatch("increment");
    }
    inputGuess.current.value=''
  };

  return (
    <div>
      <div>
        <h1>Veo veo...</h1>
        <p>- ¿Qué ves?</p>
        <p>Una cosita que empieza por la letra: {word.charAt()}</p>
      </div>

      <div className="wordGuess">
        <Gamer
          title="Jugador 1."
          description="Escribe la palabra sin que el otro jugador la vea"
        />
        <label>Escribe </label>
        <input type="text" ref={inputWord} id="input-word" />
        <button
          onClick={() => {
            addWord(inputWord.current.value);
          }}
        >
          Enviar
        </button>
      </div>

      <div className="wordGuess wordGuess--marginTop">
        <Gamer title="Jugador 2." description="Adivina la palabra" />

        <label>Escribe </label>
        <input ref={inputGuess} type="text" />
        <button
          onClick={() => {
            GuessWord(inputGuess.current.value);
          }}
        >
          Enviar
        </button>
        <p>Total de intentos: {totalAttempts}</p>
        {show && <p>Perdiste: La palabra es {word}</p>}
        {win && <p>Ganaste, ahora tu eres el jugador 1</p>}
  
        <button
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? "Empecemos de nuevo😅" : "Muéstrame la palabra🥺"}
        </button>
      </div>
    </div>
  );
}
