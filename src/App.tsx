import { createTheme, ThemeProvider } from '@mui/material/styles';

import { RouterProvider } from 'react-router-dom';
import { router } from './components/router/router';

import './App.css';
import { CustomerProvider } from './context/CustomerProvider';

const defaultTheme = createTheme();
function App() {
  return (
    <CustomerProvider>
      <ThemeProvider theme={defaultTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </CustomerProvider>
  );
}

export default App;
