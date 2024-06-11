import { Box, Typography, IconButton, CardMedia } from '@mui/material';
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
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { useCart } from 'src/context/context';

let keyOfItem = 0;

export const InfoProductCard = (product: LineItem): JSX.Element => {
  const [quantity, setQuantity] = useState<number>(product.quantity);
  const [open, setOpen] = useState<boolean>(false);
  const { cart, setCart } = useCart();

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return event;
    }
    setOpen(false);
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
    ).then(newCart => {
      const newCartData = newCart.body;
      setCart({ ...cart, ...newCartData });
    });
  };
  const handleDelete = async (event: SyntheticEvent): Promise<void> => {
    event.persist();

    await removeProductToCartByID(
      getCookie('myCart') ?? '',
      cart.version,
      product.id,
      quantity,
    ).then(newCart => {
      const newCartData = newCart.body;
      setCart({ ...cart, ...newCartData });
    });
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
    <Box
      sx={{ display: 'flex', width: '100%', marginBottom: '2%' }}
      key={keyOfItem}
    >
      <CardMedia
        component="img"
        height="194"
        image={product.variant.images![0].url ?? ''}
        alt="picture"
        sx={{ width: '35%', objectFit: 'contain' }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignContent: 'center',
          flexWrap: 'wrap',
          width: '60%',
        }}
      >
        <Typography sx={{ width: '90%', textAlign: 'center' }}>
          {product.name['en-US']}
        </Typography>
        <IconButton
          sx={{ padding: '0', marginBottom: '3%', borderRadius: 0 }}
          type="button"
          onClick={event => void handleDelete(event)}
        >
          <DeleteIcon />
        </IconButton>
        <Typography
          sx={{ width: '100%', textAlign: 'center' }}
        >{`description`}</Typography>
        {SimpleSnackbar(SERVICE_MESSAGES.countQuantity, open, handleClose)}
        <Typography>
          Quantity:
          <IconButton
            type="button"
            onClick={event => void handleChangeQuantity(event, 'minus')}
          >
            <RemoveIcon />
          </IconButton>
          {quantity}
          <IconButton
            type="button"
            onClick={event => void handleChangeQuantity(event, 'plus')}
          >
            <AddIcon />
          </IconButton>
        </Typography>
        {product.price.discounted ? (
          <Box sx={{width:"100%"}}>
            <Typography sx={{ width: '90%', textAlign: 'center' }}>
              Price of this item :{product.price.value.centAmount}
            </Typography>                
            <Typography sx={{ width: '90%', textAlign: 'center', color:'red' }}>
              Price of this item with discount :{product.price.discounted.value.centAmount}
            </Typography>
          </Box>
          ) : (
            <Typography sx={{ width: '90%', textAlign: 'center' }}>
              Price of this item :{product.price.value.centAmount}
            </Typography>
          )}       
      </Box>
    </Box>
  );
};
