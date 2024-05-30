import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../pages/MainPage/MainPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';
import { Page404 } from '../pages/404Page/404Page';

export const CreateRouter = () => {
  const arrRouter = [
    {
      path: '/',
      element: <MainPage />,
    },
    {
      path: '/login',
      element: localStorage.getItem('isAuth') ? <MainPage /> : <LoginPage />,
    },
    {
      path: '/registration',
      element: localStorage.getItem('isAuth') ? (
        <MainPage />
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
