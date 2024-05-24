import { Footer } from './Footer/Footer';
import { Main } from './Main/Main';
import { HeaderWrapper } from 'src/components/HeaderWrapper/HeaderWrapper';

export function MainPage() {
  return (
    <HeaderWrapper>
      <Main />
      <Footer />
    </HeaderWrapper>
  );
}
