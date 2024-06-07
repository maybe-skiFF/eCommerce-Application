import {
  Box,
  FormControl,
  Typography,
  IconButton,
  CardMedia,
} from '@mui/material';
import { LineItem } from '@commercetools/platform-sdk';
import { useState } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export const InfoProductCard = (product: LineItem): JSX.Element => {
  const [quantity, setQuantity] = useState<number>(product.quantity);

  const handleChange = () => {
    const quantityCurrent = quantity + 1;
    setQuantity(quantityCurrent);
  };

  if (!product) {
    return (
      <Box>
        <Typography>{`There is not any products`}</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ display: 'flex', width: '60%', marginBottom: '2%' }}>
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
          justifyContent: 'center',
          alignContent: 'center',
          flexWrap: 'wrap',
          width: '60%',
        }}
      >
        <Typography
          sx={{ width: '100%', textAlign: 'center', marginRight: '30%' }}
        >
          {product.name['en-US']}
        </Typography>
        <Typography
          sx={{ width: '100%', textAlign: 'center', marginRight: '30%' }}
        >{`description`}</Typography>
        <FormControl fullWidth>
          <Typography>Quantity: {quantity}</Typography>
        </FormControl>
        <IconButton type="button" onClick={handleChange}>
          <AddShoppingCartIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
