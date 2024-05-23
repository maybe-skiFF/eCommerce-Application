import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

import styles from './404Page.module.scss';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { Header } from '../MainPage/Header/Header';
import pageNotFoundImg from '../../../assets/image/404-image.jpeg';

export function Page404() {
  return (
    <>
      <Header />
      <Box className={styles.page404Wrapper}>
        <img
          className={styles.Page404Img}
          src={pageNotFoundImg}
          alt="404-image"
        />
        <Typography variant="h6" align="center">
          {SERVICE_MESSAGES.page404Text}
        </Typography>
        <Link to="/">
          <Button variant="contained">{SERVICE_MESSAGES.page404BtnText}</Button>
        </Link>
      </Box>
    </>
  );
}
