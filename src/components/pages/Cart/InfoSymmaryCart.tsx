import { Cart } from '@commercetools/platform-sdk';
import { Box, Paper, Typography } from '@mui/material';

export const InfoSummaryCart = (cart: Cart) => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: 'background.default',
        display: 'grid',
        gridTemplateColumns: { md: '3fr 0.9fr' },
        gap: 2,
      }}
    >
      <Paper elevation={3} sx={{ padding: '5% 7%', width: '100%' }}>
        <Typography variant={'h6'}>
          Number of items in cart: {cart.totalLineItemQuantity}
        </Typography>
        <Typography variant={'h6'}>
          Total amount of goods for: {cart.totalPrice.centAmount}
        </Typography>
      </Paper>
    </Box>
  );
};
