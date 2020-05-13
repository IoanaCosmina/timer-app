import React, { useState, useRef } from 'react';
import './App.css';

function padTime(time) {
  return time.toString().padStart(2, '0');
}

function App() {
  const [title, setTitle] = useState('Ready, set, go!');
  const [timeLeft, setTimeLeft] = useState(3);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  function startTimer() {
    // it means we already have a timer started
    if (intervalRef.current !== null) return;

    setTitle('You can do it!');
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft(timeLeft => {
        // stop the counter from getting below 0
        if (timeLeft >= 1) return timeLeft - 1;

        // reset the timer when the countdown is finished
        resetTimer();
        return 0;
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
    setIsRunning(false);
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle('Ready to go another round?');
    setTimeLeft(25 * 60);
    setIsRunning(false);
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
        {!isRunning &&
          <button onClick={startTimer}>
            <span>Start</span>
            <i className="fa fa-play" aria-hidden="true"></i>
          </button>
        }
        {
          isRunning &&
          <button onClick={stopTimer}>
            <span>Stop</span>
            <i className="fa fa-stop" aria-hidden="true"></i>
          </button>
        }
        <button onClick={resetTimer}>
          <span>Reset</span>
          <i className="fa fa-undo" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

export default App;
