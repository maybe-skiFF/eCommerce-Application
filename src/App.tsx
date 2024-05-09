import { createTheme, ThemeProvider } from '@mui/material/styles';

import { RouterProvider } from 'react-router-dom';
import { router } from './components/router/router';

import './App.css';

const defaultTheme = createTheme();
function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
