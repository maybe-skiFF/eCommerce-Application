import { Box, Button, Typography } from '@mui/material';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { removeAllFromCart } from 'src/serverPart/BuildCart';
import { getCookie } from 'src/utils/cookieWork';
import { InfoProductCard } from './InfoProductCard';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { SyntheticEvent } from 'react';
import { LineItem } from '@commercetools/platform-sdk';
import { HeaderWrapper } from 'src/components/HeaderWrapper/HeaderWrapper';
import { InfoSummaryCart } from './InfoSymmaryCart';
import { EmptyCart } from './EmptyCart';
import { useCart } from 'src/context/context';

export const MyCart = () => {
  const { cart, setCart } = useCart();

  const LoopProductCard = (): JSX.Element[] | JSX.Element => {
    if (!getCookie('myCart')) {
      return <Box> No Product</Box>;
    }
    console.log(cart);
    const arr = cart.lineItems.map((item: LineItem) => InfoProductCard(item));
    return arr;
  };

  const handleAllDelete = async (event: SyntheticEvent): Promise<void> => {
    event.persist();
    console.log(cart, 'me');
    const arrLines: {
      action: 'removeLineItem';
      lineItemId: string;
      quantity: number;
    }[] = [];
    cart.lineItems.forEach(line => {
      arrLines.push({
        action: 'removeLineItem',
        lineItemId: line.id,
        quantity: line.quantity,
      });
    });
    await removeAllFromCart(cart.id, cart.version, arrLines).then(newCart => {
      const newCartData = newCart.body;
      setCart({ ...cart, ...newCartData });
    });
  };

  return !cart.lineItems.length ? (
    EmptyCart()
  ) : (
    <HeaderWrapper>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{ width: '100%', textAlign: 'center', marginBottom: '5%' }}
        >
          {SERVICE_MESSAGES.yourCart}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '2%',
            padding: '15px',
          }}
        >
          <LoopProductCard />
        </Box>
        <InfoSummaryCart />
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: 'grey',
          display: 'flex',
          justifyContent: 'center',
          margin: '0 auto',
          marginBottom: '20px',
        }}
        startIcon={<DeleteForeverIcon />}
        onClick={event => void handleAllDelete(event)}
      >
        Clear the cart
      </Button>
    </HeaderWrapper>
  );
};
