import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../pages/MainPage/MainPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';
import { Page404 } from '../pages/404Page/404Page';
import { CustomerPage } from '../pages/CustomerPage/CustomerPage';
import { useIsAuth } from 'src/context/context';
import { useEffect, useState } from 'react';

export const CreateRouter = () => {
  const { isAuth } = useIsAuth();
  const [authState, setAuthState] = useState<boolean>(false);
  const lS: boolean = localStorage.getItem('isAuth') === 'true';
  console.log(localStorage.getItem('isAuth'), 'LS', isAuth, 'isAuth');

  useEffect(() => {
    function getPaths() {
      console.log(lS, 'i see you');
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
  ];
  return createBrowserRouter(arrRouter);
};
