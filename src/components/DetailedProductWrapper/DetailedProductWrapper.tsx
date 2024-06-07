import { Cart, ClientResponse } from '@commercetools/platform-sdk';

import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  IconButton,
} from '@mui/material';
import { SwiperSlider } from '../SwiperSlider/SwiperSlider';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {
  getAnonimnusCart,
  getCartByID,
  updateCartByID,
  setCountryForCart,
} from 'src/serverPart/BuildCart';
import { getCookie, setCookie } from 'src/utils/cookieWork';
import { ProductObj } from 'src/utils/interfaces';

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

  const getMyAnonimnusCart = async (): Promise<ClientResponse<Cart>> => {
    if (!getCookie('myCart')) {
      const cart = await getAnonimnusCart();
      setCookie('myCart', cart.body.id);
      const myCartWithCountry = await setCountryForCart(
        cart.body.id,
        cart.body.version,
        'US',
      );
      return myCartWithCountry;
    }
    return await getCartByID(getCookie('myCart') ?? '');
  };

  const handleClickForBuy = async () => {
    const cart = await getMyAnonimnusCart();
    const productID = productDataById.id;
    await updateCartByID(cart.body.id, cart.body.version, productID);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'flex-end',
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
          <IconButton
            sx={{ marginBottom: '0%' }}
            type="button"
            onClick={() => void handleClickForBuy()}
          >
            <AddShoppingCartIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
