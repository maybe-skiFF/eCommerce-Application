import { Box, Typography } from '@mui/material';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { getCartByID } from 'src/serverPart/BuildCart';
import { getCookie } from 'src/utils/cookieWork';
import { InfoProductCard } from './InfoProductCard';
import { Cart } from '@commercetools/platform-sdk';
import { useState, useEffect } from 'react';
import { LineItem } from '@commercetools/platform-sdk';
import { HeaderWrapper } from 'src/components/HeaderWrapper/HeaderWrapper';
import { InfoSummaryCart } from './InfoSymmaryCart';
import { EmptyCart } from './EmptyCart';
import { useParams } from 'react-router-dom';

export const MyCart = () => {
  const [cart, setCart] = useState<Cart | undefined>();
  const { key } = useParams();

  useEffect(() => {
    async function cartByIdData(): Promise<Cart> {
      try {
        const response = await getCartByID(getCookie('myCart') ?? '');
        const data = response.body;
        setCart(data);
        return data;
      } catch (error) {
        EmptyCart();
        console.log(error);
        throw error;
      }
    }
    void cartByIdData();
  }, [key]);

  const LoopProductCard = (): JSX.Element[] | JSX.Element => {
    const arrCards: JSX.Element[] = [];
    if (cart) {
      console.log(cart.version, 'myCart');
      cart.lineItems.forEach((item: LineItem) =>
        arrCards.push(InfoProductCard(item)),
      );
      return arrCards;
    }
    return EmptyCart();
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
    </HeaderWrapper>
  );
};
