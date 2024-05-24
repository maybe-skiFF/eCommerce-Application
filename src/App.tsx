import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CustomerProvider } from './context/CustomerProvider';
import { IsAuthProvider } from './context/IsAuthProvider';
import { RouterProvider } from 'react-router-dom';
import { CreateRouter } from './components/router/CreateRouter';

import './App.css';

const defaultTheme = createTheme();
function App() {
  return (
    <IsAuthProvider>
      <CustomerProvider>
        <ThemeProvider theme={defaultTheme}>
          <RouterProvider router={CreateRouter()} />
        </ThemeProvider>
      </CustomerProvider>
    </IsAuthProvider>
  );
}

export default App;
