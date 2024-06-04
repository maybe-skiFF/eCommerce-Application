import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../pages/MainPage/MainPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';
import { Page404 } from '../pages/404Page/404Page';
import { DetailedProductPage } from '../pages/DetailedProductPage/DetailedProductPage';
import { CustomerPage } from '../pages/CustomerPage/CustomerPage';
import { useIsAuth } from 'src/context/context';
import { useEffect, useState } from 'react';

export const CreateRouter = () => {
  const { isAuth } = useIsAuth();
  const [authState, setAuthState] = useState<boolean>(false);
  const lS: boolean = localStorage.getItem('isAuth') === 'true';

  useEffect(() => {
    function getPaths() {
      lS || isAuth ? setAuthState(true) : setAuthState(false);
    }
    getPaths();
  }, [lS, isAuth]);

  const arrRouter = [
    {
      path: '/',
      element: <MainPage />,
    },
    {
      path: '/catalog/:key',
      element: <DetailedProductPage />,
    },
    {
      path: '/login',
      element: authState ? <MainPage /> : <LoginPage />,
    },
    {
      path: '/registration',
      element: authState ? <MainPage /> : <RegistrationPage />,
    },
    {
      path: '/customer',
      element: authState ? <CustomerPage /> : <RegistrationPage />,
    },
    {
      path: '*',
      element: <Page404 />,
    },
    {
      path: '/:key',
      element: <MainPage />,
    },
    {
      path: '/for-kids/:key',
      element: <MainPage />,
    },
    {
      path: '/for-men/:key',
      element: <MainPage />,
    },
    {
      path: '/for-women/:key',
      element: <MainPage />,
    },
  ];
  return createBrowserRouter(arrRouter);
};
