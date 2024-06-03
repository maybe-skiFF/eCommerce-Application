import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CustomerProvider } from './context/CustomerProvider';
import { IsAuthProvider } from './context/IsAuthProvider';
import { RouterProvider } from 'react-router-dom';
import { CreateRouter } from './components/router/CreateRouter';

import './App.css';
import { ProductsProvider } from './context/ProductsProvider';

const defaultTheme = createTheme();
function App() {
  return (
    <IsAuthProvider>
      <CustomerProvider>
        <ProductsProvider>
          <ThemeProvider theme={defaultTheme}>
            <RouterProvider router={CreateRouter()} />
          </ThemeProvider>
        </ProductsProvider>
      </CustomerProvider>
    </IsAuthProvider>
  );
}

export default App;
