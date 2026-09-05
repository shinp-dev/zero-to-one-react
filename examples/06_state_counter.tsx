import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>Counter</h1>
      <p>{count}</p>
      <button onClick={() => setCount((current) => current + 1)}>
        +1
      </button>
    </main>
  );
}
