import { Box, Typography } from '@mui/material';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { getCartByID } from 'src/serverPart/BuildCart';
import { getCookie } from 'src/utils/cookieWork';
import { InfoProductCard } from './InfoProductCard';
import { Cart } from '@commercetools/platform-sdk';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LineItem } from '@commercetools/platform-sdk';
import { HeaderWrapper } from 'src/components/HeaderWrapper/HeaderWrapper';
import { InfoSummaryCart } from './InfoSymmaryCart';

export const MyCart = () => {
  const { key } = useParams();
  const [cart, setCart] = useState<Cart | undefined>();

  useEffect(() => {
    async function cartByIdData(): Promise<Cart> {
      try {
        const response = await getCartByID(getCookie('myCart') ?? '');
        const data = response.body;
        setCart(data);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    void cartByIdData();
  }, [key]);
  const LoopProductCard = (): JSX.Element[] => {
    const arrCards: JSX.Element[] = [];
    if (cart) {
      cart.lineItems.forEach((item: LineItem) =>
        arrCards.push(InfoProductCard(item)),
      );
      return arrCards;
    }
    return arrCards;
  };
  return !cart ? (
    <HeaderWrapper>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'column',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ width: '100%', textAlign: 'center' }}>
          {SERVICE_MESSAGES.yourCart}
        </Typography>
      </Box>
    </HeaderWrapper>
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
