import { Product } from '@commercetools/platform-sdk';

import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { SwiperSlider } from '../SwiperSlider/SwiperSlider';

interface ProductObj {
  productDataById: Product | undefined;
}

export function DetailedProductWrapper({ productDataById }: ProductObj) {
  if (!productDataById) return;

  const productDiscountPrice =
    productDataById.masterData.current.masterVariant.prices![2].discounted
      ?.value?.centAmount;
  const productPrice =
    productDataById.masterData.current.masterVariant.prices![2].value
      ?.centAmount;
  const productDescription =
    productDataById.masterData.current.description!['en-US'];
  const productImgArr = productDataById.masterData.current.masterVariant.images;
  const productName = productDataById.masterData.current.name['en-US'];

  function checkDiscountPrice() {
    let isDiscounted = false;
    if (productDiscountPrice) {
      isDiscounted = true;
      return isDiscounted;
    }
    return false;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: '20px',
          marginTop: '40px',
        }}
      >
        <Box>
          <SwiperSlider productImgArr={productImgArr} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 4 }}>
          <Typography variant="h4">{productName}</Typography>
          <Typography variant="h5">
            {productDescription.length > 100
              ? `${productDescription.slice(0, 100)}...`
              : productDescription}
          </Typography>
          {checkDiscountPrice() ? (
            <Box sx={{ height: '80px' }}>
              <Typography
                variant="h6"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                }}
              >
                {productPrice / 100} EUR
              </Typography>
              <Typography sx={{ color: 'red', fontWeight: '700' }} variant="h6">
                {(productDiscountPrice ?? 0) / 100} EUR - with discount
              </Typography>
            </Box>
          ) : (
            <Box sx={{ height: '80px' }}>
              <Typography variant="h6">{productPrice / 100} EUR</Typography>
            </Box>
          )}
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Select Color
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="red" control={<Radio />} label="Red" />
              <FormControlLabel
                value="green"
                control={<Radio />}
                label="Green"
              />
              <FormControlLabel
                value="black"
                control={<Radio />}
                label="Black"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
