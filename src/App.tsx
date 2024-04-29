import { Button } from '@mui/material';
import { useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import Button1 from './components/Button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Button1
          value={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
          voluptate doloribus, nam earum libero`}
        ></Button1>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          {/* <img src={viteLogo} className="logo" alt="Vite logo" /> */}
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button variant="contained" onClick={() => setCount(prev => prev + 1)}>
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
