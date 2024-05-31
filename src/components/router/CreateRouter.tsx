import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../pages/MainPage/MainPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';
import { Page404 } from '../pages/404Page/404Page';
import { CustomerPage } from '../pages/CustomerPage/CustomerPage';

export const CreateRouter = () => {
  console.log(localStorage.getItem('isAuth'), 'LS');
  const arrRouter = [
    {
      path: '/',
      element: <MainPage />,
    },
    {
      path: '/login',
      element:
        localStorage.getItem('isAuth') === 'true' ? (
          <MainPage />
        ) : (
          <LoginPage />
        ),
    },
    {
      path: '/registration',
      element:
        localStorage.getItem('isAuth') === 'true' ? (
          <MainPage />
        ) : (
          <RegistrationPage />
        ),
    },
    {
      path: '/customer',
      element:
        localStorage.getItem('isAuth') === 'true' ? (
          <CustomerPage />
        ) : (
          <RegistrationPage />
        ),
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ];
  return createBrowserRouter(arrRouter);
};
