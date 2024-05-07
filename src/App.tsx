import { createTheme, ThemeProvider } from '@mui/material/styles';

import './App.css';

const defaultTheme = createTheme();
function App() {
  return <ThemeProvider theme={defaultTheme}></ThemeProvider>;
}

export default App;
