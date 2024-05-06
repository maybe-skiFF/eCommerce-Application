import { createTheme, ThemeProvider } from '@mui/material/styles';

import './App.css';
import RegistrationPage from './components/UI/RegistrationPage';

const defaultTheme = createTheme();
function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <RegistrationPage />
    </ThemeProvider>
  );
}

export default App;
