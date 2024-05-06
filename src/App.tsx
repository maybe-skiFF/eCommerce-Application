import { Routes, Route } from 'react-router-dom';

import { MainPage } from './components/pages/MainPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegistrationPage } from './components/pages/RegistrationPage';
import { Page404 } from './components/pages/404Page';

import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
