import { Cart, ClientResponse, ErrorObject } from '@commercetools/platform-sdk';

import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { SwiperSlider } from '../SwiperSlider/SwiperSlider';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  getAnonymnusCart,
  getCartByID,
  addProductToCartByID,
  setCountryForCart,
  removeProductToCartByID,
} from 'src/serverPart/BuildCart';
import { getCookie, setCookie } from 'src/utils/cookieWork';
import { ProductObj } from 'src/utils/interfaces';
import { SyntheticEvent, useState } from 'react';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { SimpleSnackbar } from '../SimpleSnackbar/SimpleSnackbar';
import { useCart } from 'src/context/context';

export function DetailedProductWrapper({ productDataById }: ProductObj) {
  const [open, setOpen] = useState<string>('');
  const { cart, setCart } = useCart();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return event;
    }
    setOpen('');
  };

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

  const isExistToCart = cart.lineItems.some(
    line => line.productId === productDataById.id,
  );

  const getMyAnonimnusCart = async (): Promise<ClientResponse<Cart>> => {
    if (!getCookie('myCart')) {
      const cartAnon = await getAnonymnusCart();
      setCookie('myCart', cartAnon.body.id);
      const cartFromServer = await setCountryForCart(
        cartAnon.body.id,
        cartAnon.body.version,
        'US',
      ).then(data => {
        console.log(data, 'cartAnan');
        setCart({ ...cart, ...data.body });
        return data;
      });
      return cartFromServer;
    }
    return await getCartByID(getCookie('myCart') ?? '').then(data => {
      setCart({ ...cart, ...data.body });
      return data;
    });
  };

  const handleClickForAddToCart = async () => {
    setIsLoading(true);
    const cartFromServer = await getMyAnonimnusCart();
    const productID = productDataById.id;
    await addProductToCartByID(
      cartFromServer.body.id,
      cartFromServer.body.version,
      productID,
    )
      .then(({ body }) => {
        setCart({ ...cart, ...body });
        setOpen(SERVICE_MESSAGES.added);
        setIsLoading(false);
      })
      .catch((error: ErrorObject) => setOpen(error.message));
  };

  const handleClickForDelete = async () => {
    setIsLoading(true);
    const productID = productDataById.id;
    const productInCart = cart.lineItems.filter(
      line => productID === line.productId,
    );
    if (productInCart.length > 0) {
      await removeProductToCartByID(
        cart.id,
        cart.version,
        productInCart[0].id,
        productInCart[0].quantity,
      )
        .then(({ body }) => {
          setCart({ ...cart, ...body });
          setOpen(SERVICE_MESSAGES.deleted);
          setIsLoading(false);
        })
        .catch((error: ErrorObject) => setOpen(error.message));
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      <Box
        sx={[
          {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'flex-end',
            columnGap: '20px',
            marginTop: '40px',
          },
          isLoading ? { opacity: 0.5 } : { opacity: 1 },
        ]}
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
            sx={{ marginBottom: '0%', borderRadius: 0 }}
            disabled={isExistToCart}
            type="button"
            onClick={() => void handleClickForAddToCart()}
          >
            <AddShoppingCartIcon fontSize="large" />
          </IconButton>
          <IconButton
            sx={{ marginBottom: '0%', borderRadius: 0 }}
            disabled={!isExistToCart}
            type="button"
            onClick={() => void handleClickForDelete()}
          >
            <DeleteIcon fontSize="large" />
          </IconButton>
          {SimpleSnackbar(open, open !== '', handleClose)}
        </Box>
      </Box>
      {isLoading ? (
        <CircularProgress
          style={{ position: 'absolute', zIndex: 2, top: '50%', left: '50%' }}
        />
      ) : (
        ''
      )}
    </Box>
  );
}
