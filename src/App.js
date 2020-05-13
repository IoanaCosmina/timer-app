import React, { useState } from 'react';
import './App.css';

function padTime(time) {
  return time.toString().padStart(2, '0');
}

function App() {
  const [title, setTitle] = useState('Ready, set, go!');
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  return (
    <div className="app">
      <h2>{title}</h2>
      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div className="buttons">
        <button>
          <span>Start</span>
          <i className="fa fa-play" aria-hidden="true"></i>
        </button>
        <button>
          <span>Stop</span>
          <i className="fa fa-stop" aria-hidden="true"></i>
        </button>
        <button>
          <span>Reset</span>
          <i className="fa fa-undo" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

export default App;
