import { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<Theme>('light');

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <p>Current theme: {theme}</p>;
}

function Page() {
  return (
    <section>
      <Toolbar />
    </section>
  );
}

export default function App() {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <ThemeContext value={theme}>
      <button
        onClick={() =>
          setTheme((current) => (current === 'light' ? 'dark' : 'light'))
        }
      >
        Toggle theme
      </button>
      <Page />
    </ThemeContext>
  );
}
