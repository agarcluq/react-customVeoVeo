import React, { useState, useRef,useEffect } from "react";
import useCounter from './hooks/useCounter';
import "./style.css";
import Gamer from "./Gamer.js";


/**
 * Componente adivina la palabra
 */
export default function App() {
  const [word, setWord] = useState("");
  const [show, setShow] = useState(false);
  const [win, setWin] = useState(false);
  const [counter, increment, reset] = useCounter(0);
  const inputGuess = useRef();
  const inputWord = useRef()
  // Añadir palabra
  const addWord = word => {
    setWord(word);
  };

  useEffect(()=>{
  inputWord.current.value='';
  },[word])

  // Adivina la palabra
  const GuessWord = wordGuess => {
    if (word === wordGuess) {
      setWin(true);
      reset()
    } else {
     increment()
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
        <p>Total de intentos: {counter}</p>
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
