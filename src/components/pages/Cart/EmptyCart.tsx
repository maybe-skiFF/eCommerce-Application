import { Box, Link, Typography } from '@mui/material';
import { HeaderWrapper } from 'src/components/HeaderWrapper/HeaderWrapper';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { Link as RouterLink } from 'react-router-dom';

export const EmptyCart = (): JSX.Element => {
  return (
    <HeaderWrapper>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'column',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            backgroundImage: 'url(src/assets/image/emptyCart.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            marginTop: '20px',
            height: '400px',
            width: '100%',
            alignContent: 'center',
          }}
        ></Box>
        <Typography
          variant="h4"
          sx={{ width: '100%', textAlign: 'center', marginTop: '20px' }}
        >
          {SERVICE_MESSAGES.cartEmpty}
        </Typography>
        <Typography
          variant="h6"
          sx={{ width: '100%', textAlign: 'center', marginTop: '20px' }}
        >
          {SERVICE_MESSAGES.cartEmptyMessage}
        </Typography>
        <Link
          sx={{
            padding: '5px',
            border: '1px solid rgb(25, 118, 210)',
            borderRadius: '5px',
            margin: '40px auto',
          }}
          component={RouterLink}
          underline="none"
          to="/"
        >
          <Typography variant="h5">{SERVICE_MESSAGES.returnCatalog}</Typography>
        </Link>
      </Box>
    </HeaderWrapper>
  );
};
