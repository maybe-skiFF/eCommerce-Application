import { createTheme, ThemeProvider } from '@mui/material/styles';

import { RouterProvider } from 'react-router-dom';
import { router } from './components/router/router';
import './App.css';
// const myCustomer: customerData = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   password: '',
//   key: '',
//   dataOfBirdth: ``,
//   address: {
//     country: 'Russia',
//     city: '',
//     street: '',
//     postCode: '',
//   },
// };
const defaultTheme = createTheme();
function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
