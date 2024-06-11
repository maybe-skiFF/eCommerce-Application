import { Box, Paper, Typography } from '@mui/material';
import { EmptyCart } from './EmptyCart';
import { useCart } from 'src/context/context';

export const InfoSummaryCart = () => {
  const { cart } = useCart();

  return typeof cart.totalPrice === 'undefined' ? (
    EmptyCart()
  ) : (
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
          Number of items in cart:{' '}
          {cart.lineItems.length > 0 ? cart.totalLineItemQuantity : 0}
        </Typography>
        <Typography variant={'h6'}>
          Total amount of goods for: {cart.totalPrice.centAmount ?? ''}
        </Typography>
      </Paper>
    </Box>
  );
};
