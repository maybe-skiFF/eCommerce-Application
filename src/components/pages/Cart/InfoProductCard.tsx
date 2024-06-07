import { Box, Typography, IconButton, CardMedia } from '@mui/material';
import { LineItem } from '@commercetools/platform-sdk';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  getCustomerCart,
  changeProductQuantityToCartByID,
  removeProductToCartByID,
} from 'src/serverPart/BuildCart';
import { getCookie } from 'src/utils/cookieWork';

export const InfoProductCard = (product: LineItem): JSX.Element => {
  const [quantity, setQuantity] = useState<number>(product.quantity);

  const handleIncrease = async () => {
    const quantityCurrent = quantity + 1;
    const cart = await getCustomerCart(getCookie('myID') ?? '');
    setQuantity(quantityCurrent);
    await changeProductQuantityToCartByID(
      getCookie('myCart') ?? '',
      cart.body.version,
      product.id,
      quantity,
    );
  };

  const handleDecrease = async () => {
    if (quantity > 0) {
      const quantityCurrent = quantity + 1;
      const cart = await getCustomerCart(getCookie('myID') ?? '');
      setQuantity(quantityCurrent);
      await changeProductQuantityToCartByID(
        getCookie('myCart') ?? '',
        cart.body.version,
        product.id,
        quantity,
      );
    }
  };

  const handleDelete = async () => {
    const quantityCurrent = quantity + 1;
    const cart = await getCustomerCart(getCookie('myID') ?? '');
    setQuantity(quantityCurrent);
    await removeProductToCartByID(
      getCookie('myCart') ?? '',
      cart.body.version,
      product.id,
      quantity,
    );
  };

  if (!product) {
    return (
      <Box>
        <Typography>{`There is not any products`}</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ display: 'flex', width: '100%', marginBottom: '2%' }}>
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
          sx={{ padding: '0', marginBottom: '3%' }}
          type="button"
          onClick={() => void handleDelete}
        >
          <DeleteIcon />
        </IconButton>
        <Typography
          sx={{ width: '100%', textAlign: 'center' }}
        >{`description`}</Typography>

        <Typography>
          Quantity:
          <IconButton type="button" onClick={() => void handleDecrease}>
            <RemoveIcon />
          </IconButton>
          {quantity}
          <IconButton type="button" onClick={() => void handleIncrease}>
            <AddIcon />
          </IconButton>
        </Typography>
      </Box>
    </Box>
  );
};
