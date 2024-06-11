import { Box, Button, Typography } from '@mui/material';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import {
  getCartByID,
  removeAllFromCart,
  removeProductToCartByID,
  // removeProductToCartByID,
} from 'src/serverPart/BuildCart';
import { deleteCookie, getCookie } from 'src/utils/cookieWork';
import { InfoProductCard } from './InfoProductCard';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import { Cart } from '@commercetools/platform-sdk';
import { SyntheticEvent } from 'react';
import { Cart, LineItem } from '@commercetools/platform-sdk';
import { HeaderWrapper } from 'src/components/HeaderWrapper/HeaderWrapper';
import { InfoSummaryCart } from './InfoSymmaryCart';
import { EmptyCart } from './EmptyCart';
import { useCart } from 'src/context/context';

export const MyCart = () => {
  // const [currCart, setCurrCart] = useState<Cart | undefined>();
  const { cart, setCart } = useCart();
  // useEffect(() => {
  //   async function cartByIdData(): Promise<Cart> {
  //     try {
  //       const response = await getCartByID(getCookie('myCart') ?? '');
  //       const data = response.body;
  //       for (const [key, value] of Object.entries(data)) {
  //         setCart({ ...cart, [key]: value });
  //       }
  //       return data;
  //     } catch (error) {
  //       EmptyCart();
  //       console.log(error);
  //       throw error;
  //     }
  //   }
  //   void cartByIdData();
  // }, [setCart]);

  const LoopProductCard = (): JSX.Element[] | JSX.Element => {
    if (!getCookie('myCart')) {
      return <Box> No Product</Box>;
    }
    console.log(cart.version, 'myCart');
    const arr = cart.lineItems.map((item: LineItem) => InfoProductCard(item));
    return arr;
  };

  // const createChain = async (data: Cart) => {
  //   if (data.lineItems.length > 0) {
  //     await removeProductToCartByID(
  //       data.id,
  //       data.version,
  //       data.lineItems[0].id,
  //       data.lineItems[0].quantity,
  //     ).then(newCart => {
  //       const newCartData = newCart.body;
  //       setCart({ ...cart, ...newCartData });
  //     });
  //   } else {
  //     await removeProductToCartByID(
  //       data.id,
  //       data.version,
  //       data.lineItems[0].id,
  //       data.lineItems[0].quantity,
  //     )
  //       .then(newCart => {
  //         const newCartData = newCart.body;
  //         setCart({ ...cart, ...newCartData });
  //       })
  //       .then(() => createChain(cart));
  //   }
  // };

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
        <InfoSummaryCart />
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
