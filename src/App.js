import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const handleStart = () => {
    setIsRunning(!isRunning);
    // if (!isRunning) {
    //   setIsRunning(true);
    // }
  };

  const handleStop = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          let { hours, minutes, seconds } = prevTime;

          seconds += 1;
          if (seconds === 60) {
            seconds = 0;
            minutes += 1;
          }
          if (minutes === 60) {
            minutes = 0;
            if (hours === 23) {
              minutes = 0;
              hours = 0;
              seconds = 0;
            } else {
              hours += 1;
            }
          }

          return { hours, minutes, seconds };
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div>{time.hours.toString().padStart(2, '0')}:</div>
        <div>{time.minutes.toString().padStart(2, '0')}:</div>
        <div>{time.seconds.toString().padStart(2, '0')}</div>
      </div>
      <button onClick={handleStart}>{isRunning ? 'Pause' : 'Play'}</button>
      {/* <button onClick={handleStop}>Stop</button> */}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
