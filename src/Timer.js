import React, { useState, useRef } from 'react';
import soundfile from './assets/gongSound.mp3';
import { padTime } from './utils';

export default function Timer() {
    const duration = 25;
    const [title, setTitle] = useState('Ready, set, go!');
    const [timeLeft, setTimeLeft] = useState(duration * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const intervalRef = useRef(null);

    function startTimer() {
        // it means we already have a timer started
        if (intervalRef.current !== null) return;
        setTitle('You can do it!');
        setIsRunning(true);
        setIsComplete(false);
        intervalRef.current = setInterval(() => {
            setTimeLeft(timeLeft => {
                // stop the counter from getting below 0
                if (timeLeft >= 1) return timeLeft - 1;

                setIsComplete(true);
                // reset the timer when the countdown is finished
                resetTimer();
                return 0;
            });
        }, 1000);
    };

    function stopTimer() {
        // there is no timer started
        if (intervalRef.current === null) return;
        setTitle('Keep it up!');
        clearInterval(intervalRef.current);
        // without null, the startTimer won't start again
        intervalRef.current = null;
        setIsRunning(false);
    };

    function resetTimer() {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTitle('Ready to go another round?');
        setTimeLeft(duration * 60);
        setIsRunning(false);
    };

    const minutes = padTime(Math.floor(timeLeft / 60));
    const seconds = padTime(timeLeft - minutes * 60);

    return (
        <>
            <h2>{title}</h2>
            <div className="timer">
                <span>{minutes}</span>
                <span>:</span>
                <span>{seconds}</span>
            </div>
            {
                isComplete && <audio src={soundfile} autoPlay />
            }
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
        </>
    );
}