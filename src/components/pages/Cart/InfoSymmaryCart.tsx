import { ErrorObject } from '@commercetools/platform-sdk';
import { Box, Paper, Typography } from '@mui/material';
import { getTextForm } from 'src/utils/createFormControl';
import { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react';
import { SubmitButton } from 'src/components/SubmitButton/SubmitButton';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import {
  addDiscountToCart,
  checkDiscount,
  getCartDiscount,
} from 'src/serverPart/BuildCart';
import { useCart } from 'src/context/context';
import { SimpleSnackbar } from 'src/components/SimpleSnackbar/SimpleSnackbar';
import { calculateTotalPriceWithoutDiscount } from 'src/utils/calculateTotalPriceWithoutDiscounts';

export const InfoSummaryCart = () => {
  const { cart, setCart } = useCart();
  const [open, setOpen] = useState<string>('');

  const handleOnInputDiscount = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    if (event.target.value !== '') {
      console.log(event.target.value);
    }
  };

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return event;
    }
    setOpen('');
  };

  const handleOnSubmitDiscount = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const code = (data.get('discount') as string) ?? '';
    await checkDiscount(code)
      .then(response => {
        const res = getCartDiscount(response.body.cartDiscounts[0].id);
        return res;
      })
      .then(() => {
        const t = addDiscountToCart(
          cart.id,
          cart.version,
          data.get('discount') as string,
        );
        return t;
      })
      .then(res => {
        console.log(res);
        setCart({ ...cart, ...res.body });
        setOpen(SERVICE_MESSAGES.discountOn);
      })
      .catch((error: ErrorObject) => setOpen(error.message));
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: 'background.default',
        display: 'flex',
        // gridTemplateColumns: { md: '1fr' },
        // gap: 1.8,
        width: 'clamp(30%, 400px ,100%)',
      }}
    >
      <Paper elevation={3} sx={{ padding: '5% 7%', width: '100%' }}>
        <Typography variant={'h6'} sx={{ width: '100%', marginBottom: '1.5%' }}>
          Number of items in cart:
          {cart.lineItems.length > 0 ? cart.totalLineItemQuantity : 0}
        </Typography>
        {cart.discountCodes.length ? (
          <Box sx={{ width: '100%' }}>
            <Typography
              sx={{ width: '100%', textAlign: 'center', marginBottom: '1.5%' }}
            >
              {SERVICE_MESSAGES.withoutDiscount} :
              {calculateTotalPriceWithoutDiscount(cart) / 100}{' '}
              {SERVICE_MESSAGES.USD}
            </Typography>
            <Typography
              sx={{
                width: '100%',
                textAlign: 'center',
                color: 'red',
                marginBottom: '1.5%',
              }}
            >
              {SERVICE_MESSAGES.withDiscount}:{cart.totalPrice.centAmount / 100}
              {SERVICE_MESSAGES.USD}
            </Typography>
            <Typography
              sx={{
                width: '100%',
                textAlign: 'center',
                color: 'blue',
                marginBottom: '1.5%',
              }}
            >
              {SERVICE_MESSAGES.benefit}:
              {cart.discountOnTotalPrice!.includedDiscounts[0].discountedAmount
                .centAmount / 100}
              {SERVICE_MESSAGES.USD}
            </Typography>
          </Box>
        ) : (
          <Typography sx={{ width: '90%', textAlign: 'center' }}>
            {SERVICE_MESSAGES.totalAmount}:{cart.totalPrice.centAmount / 100}{' '}
            {SERVICE_MESSAGES.USD}
          </Typography>
        )}
        <Box
          component="form"
          onSubmit={event => void handleOnSubmitDiscount(event)}
        >
          {getTextForm('discount', '', handleOnInputDiscount, true)}
          {SubmitButton([SERVICE_MESSAGES.checkDone], SERVICE_MESSAGES.send)}
        </Box>
        {SimpleSnackbar(open, open !== '', handleClose)}
      </Paper>
    </Box>
  );
};
