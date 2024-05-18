import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Main } from './Main/Main';
import { useLocation } from 'react-router-dom';

export function MainPage() {
  const location = useLocation();
  const customer = location.state?.customer;
  console.log(customer);
  return (
    <>
      <Header customer={customer} />
      <Main />
      <Footer />
    </>
  );
}
