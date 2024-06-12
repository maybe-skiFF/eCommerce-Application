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

  return typeof cart === 'undefined' ? (
    EmptyCart()
  ) : (
    <HeaderWrapper>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'column',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
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
            width: '60%',
            flexDirection: 'column',
            marginBottom: '2%',
          }}
        >
          <LoopProductCard />
        </Box>
        {InfoSummaryCart(cart)}
      </Box>
      <Button
        variant="contained"
        sx={{ backgroundColor: 'grey' }}
        startIcon={<DeleteForeverIcon />}
        onClick={event => void handleAllDelete(event)}
      >
        Clear the cart
      </Button>
    </HeaderWrapper>
  );
};
