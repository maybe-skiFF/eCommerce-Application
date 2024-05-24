import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import pageNotFoundImg from '../../../assets/image/404-image.jpeg';
import { HeaderWrapper } from 'src/components/HeaderWrapper/HeaderWrapper';

export function Page404() {
  return (
    <HeaderWrapper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src={pageNotFoundImg}
          alt="404-image"
          sx={{
            maxWidth: '60%',
            height: '60%',
          }}
        />
        <Typography variant="h6" align="center">
          {SERVICE_MESSAGES.page404Text}
        </Typography>
        <Link to="/">
          <Button variant="contained">{SERVICE_MESSAGES.page404BtnText}</Button>
        </Link>
      </Box>
    </HeaderWrapper>
  );
}
