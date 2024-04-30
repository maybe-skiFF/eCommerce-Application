import { useState } from 'react';
import './App.css';
import { Button } from './components/Button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Button>
         Here we are
        </Button>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button
          variant="contained"
          onClick={() => setCount(count => count + 1)}
        >
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
