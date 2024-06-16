import { LineItem } from '@commercetools/platform-sdk';
import { Box, Typography } from '@mui/material';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';

export const createTextForProductCart = (
  quantity: number,
  product: LineItem,
  discount: 'sale' | 'promo' | 'none',
) => {
  if (discount === 'sale') {
    return (
      <Box sx={{ width: '100%' }}>
        <Typography sx={{ width: '100%', textAlign: 'center' }}>
          {SERVICE_MESSAGES.withoutDiscount} :
          {product.price.value.centAmount / 100} {SERVICE_MESSAGES.USD}
        </Typography>
        <Typography sx={{ width: '100%', textAlign: 'center', color: 'red' }}>
          {SERVICE_MESSAGES.withDiscount}:
          {(product.price.discounted!.value.centAmount / 100).toFixed(2)}
          {SERVICE_MESSAGES.USD}
        </Typography>
        <Typography sx={{ width: '100%', textAlign: 'center', color: 'blue' }}>
          {SERVICE_MESSAGES.totalAmountThisItem}:
          {(product.price.discounted!.value.centAmount * quantity) / 100}
          {SERVICE_MESSAGES.USD}
        </Typography>
      </Box>
    );
  }
  if (discount === 'promo') {
    const discountPrice =
      product.variant.prices![2].value.centAmount -
      product.variant.prices![2].value.centAmount * 0.25;
    return (
      <Box sx={{ width: '100%' }}>
        <Typography sx={{ width: '100%', textAlign: 'center' }}>
          {SERVICE_MESSAGES.withoutDiscount} :
          {product.variant.prices![2].value.centAmount / 100}{' '}
          {SERVICE_MESSAGES.USD}
        </Typography>
        <Typography sx={{ width: '100%', textAlign: 'center', color: 'red' }}>
          {SERVICE_MESSAGES.withDiscount}:{(discountPrice / 100).toFixed(2)}
          {SERVICE_MESSAGES.USD}
        </Typography>
        <Typography sx={{ width: '100%', textAlign: 'center', color: 'blue' }}>
          {SERVICE_MESSAGES.totalAmountThisItem}:
          {((discountPrice * quantity) / 100).toFixed(2)}
          {SERVICE_MESSAGES.USD}
        </Typography>
      </Box>
    );
  } else {
    <Box>
      <Typography sx={{ width: '100%', textAlign: 'center' }}>
        {SERVICE_MESSAGES.totalAmount}:{product.price.value.centAmount / 100}{' '}
        {SERVICE_MESSAGES.USD}
      </Typography>
      <Typography sx={{ width: '100%', textAlign: 'center', color: 'blue' }}>
        {SERVICE_MESSAGES.totalAmountThisItem}:
        {(product.price.value.centAmount * quantity) / 100}
        {SERVICE_MESSAGES.USD}
      </Typography>
    </Box>;
  }
};
