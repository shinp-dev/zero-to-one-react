import { useEffect, useState } from 'react';

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const timerId = window.setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isRunning]);

  return (
    <main>
      <p>{seconds} seconds</p>
      <button onClick={() => setIsRunning((current) => !current)}>
        {isRunning ? 'Pause' : 'Resume'}
      </button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </main>
  );
}
