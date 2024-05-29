import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../pages/MainPage/MainPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';
import { Page404 } from '../pages/404Page/404Page';
import { DetailedProductPage } from '../pages/DetailedProductPage/DetailedProductPage';
import { useIsAuth } from 'src/context/context';

export const CreateRouter = () => {
  const { isAuth } = useIsAuth();
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
      element: isAuth ? <MainPage /> : <LoginPage />,
    },
    {
      path: '/registration',
      element: isAuth ? <MainPage /> : <RegistrationPage />,
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ];
  return createBrowserRouter(arrRouter);
};
