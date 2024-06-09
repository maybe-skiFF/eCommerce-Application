import { Box, Typography } from '@mui/material';
import { HeaderWrapper } from 'src/components/HeaderWrapper/HeaderWrapper';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';

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
        <Typography sx={{ width: '100%', textAlign: 'center' }}>
          {SERVICE_MESSAGES.yourCart}
        </Typography>
      </Box>
    </HeaderWrapper>
  );
};
