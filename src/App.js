import React, { useState, useRef } from 'react';
import './App.css';

function padTime(time) {
  return time.toString().padStart(2, '0');
}

function App() {
  const [title, setTitle] = useState('Ready, set, go!');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const intervalRef = useRef(null);

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  function startTimer() {
    // it means we already have a timer started
    if (intervalRef.current !== null) return;

    setTitle('You can do it!');
    intervalRef.current = setInterval(() => {
      setTimeLeft(timeLeft => {
        // stop the counter from getting below 0
        return (timeLeft >= 1) ? timeLeft - 1 : 0;
      });
    }, 1000);
  }

  function stopTimer() {
    // there is no timer started
    if (intervalRef.current === null) return;

    setTitle('Keep it up!');
    clearInterval(intervalRef.current);
    // without null, the startTimer won't start again
    intervalRef.current = null;
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle('Ready to go another round?');
    setTimeLeft(25 * 60);
  }

  return (
    <div className="app">
      <h2>{title}</h2>
      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div className="buttons">
        <button onClick={startTimer}>
          <span>Start</span>
          <i className="fa fa-play" aria-hidden="true"></i>
        </button>
        <button onClick={stopTimer}>
          <span>Stop</span>
          <i className="fa fa-stop" aria-hidden="true"></i>
        </button>
        <button onClick={resetTimer}>
          <span>Reset</span>
          <i className="fa fa-undo" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

export default App;
