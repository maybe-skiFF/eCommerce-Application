import { Box, Typography, IconButton, CardMedia, Paper } from '@mui/material';
import { LineItem } from '@commercetools/platform-sdk';
import { SyntheticEvent, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  getCustomerCart,
  getCartByID,
  changeProductQuantityToCartByID,
  removeProductToCartByID,
} from 'src/serverPart/BuildCart';
import { getCookie } from 'src/utils/cookieWork';
import { SimpleSnackbar } from 'src/components/SimpleSnackbar/SimpleSnackbar';
import { useCart } from 'src/context/context';
import { createTextForProductCart } from './createTextForProductCart';
import { ErrorObject } from '@commercetools/platform-sdk';

let keyOfItem = 0;

export const InfoProductCard = (product: LineItem): JSX.Element => {
  const [quantity, setQuantity] = useState<number>(product.quantity);
  const [open, setOpen] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const { cart, setCart } = useCart();

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return event;
    }
    setOpen('');
  };

  const handleChangeQuantity = async (
    event: SyntheticEvent,
    operation: 'plus' | 'minus',
  ) => {
    event.persist();
    if (operation === 'plus') {
      setQuantity(quantity => quantity + 1);
    } else {
      setQuantity(quantity => quantity - 1);
    }
    const cart = !getCookie('myID')
      ? await getCartByID(getCookie('myCart') ?? '')
      : await getCustomerCart(getCookie('myID') ?? '');
    await changeProductQuantityToCartByID(
      getCookie('myCart') ?? '',
      cart.body.version,
      product.id,
      operation === 'plus' ? quantity + 1 : quantity - 1,
    )
      .then(newCart => {
        const newCartData = newCart.body;
        setCart({ ...cart, ...newCartData });
      })
      .catch((error: ErrorObject) => {
        setOpen(error.message);
      });
  };
  const handleDelete = async (event: SyntheticEvent): Promise<void> => {
    event.persist();
    setDisabled(true);
    await removeProductToCartByID(
      getCookie('myCart') ?? '',
      cart.version,
      product.id,
      quantity,
    )
      .then(newCart => {
        const newCartData = newCart.body;
        setDisabled(false);
        setCart({ ...cart, ...newCartData });
      })
      .catch((error: ErrorObject) => setOpen(error.message));
  };

  keyOfItem += 1;
  if (!product) {
    return (
      <Box>
        <Typography>{`There is not any products`}</Typography>
      </Box>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{ padding: '5% 7%', width: '80%', marginBottom: '3%' }}
      key={keyOfItem}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
        }}
      >
        <CardMedia
          component="img"
          height="194"
          image={product.variant.images![0].url ?? ''}
          alt="picture"
          sx={{ width: '35%', objectFit: 'contain' }}
        />
        {SimpleSnackbar(open, open !== '', handleClose)}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignContent: 'center',
            flexWrap: 'wrap',
            width: '60%',
          }}
        >
          <Typography
            variant="h6"
            sx={{ width: '90%', textAlign: 'center', color: 'blue' }}
          >
            {product.name['en-US']}
          </Typography>
          <IconButton
            sx={{ padding: '0', marginBottom: '3%', borderRadius: 0 }}
            type="button"
            onClick={event => void handleDelete(event)}
          >
            <DeleteIcon />
          </IconButton>
          <Typography sx={{ width: '100%', textAlign: 'center' }}>
            Quantity:
            <IconButton
              disabled={disabled}
              type="button"
              onClick={event => void handleChangeQuantity(event, 'minus')}
            >
              <RemoveIcon />
            </IconButton>
            {quantity}
            <IconButton
              disabled={disabled}
              type="button"
              onClick={event => void handleChangeQuantity(event, 'plus')}
            >
              <AddIcon />
            </IconButton>
          </Typography>
          {product.price.discounted
            ? createTextForProductCart(quantity, product, 'sale')
            : cart.discountCodes.length > 0
              ? createTextForProductCart(quantity, product, 'promo')
              : createTextForProductCart(quantity, product, 'none')}
        </Box>
      </Box>
    </Paper>
  );
};
