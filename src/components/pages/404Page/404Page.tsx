import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import styles from './404Page.module.scss';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { Header } from '../MainPage/Header/Header';
import pageNotFoundImg from '../../../assets/image/404-image.jpeg';

export function Page404() {
  return (
    <>
      <Header />
      <div className={styles.page404Wrapper}>
        <img
          className={styles.Page404Img}
          src={pageNotFoundImg}
          alt="404-image"
        />
        <p className={styles.Page404Text}>{SERVICE_MESSAGES.page404Text}</p>
        <Link to="/">
          <Button variant="contained">Back To MainPage</Button>
        </Link>
      </div>
    </>
  );
}
