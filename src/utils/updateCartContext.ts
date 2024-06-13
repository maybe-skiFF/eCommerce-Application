import { getCartByID, getAnonymnusCart } from 'src/serverPart/BuildCart';
import { getCookie, setCookie } from './cookieWork';
import { Cart } from '@commercetools/platform-sdk';

export const updateCartContext = (
  setStateFunc: (value: React.SetStateAction<Cart>) => void,
  state: Cart,
) => {
  if (getCookie('myCart')) {
    async () => {
      const cartNew = await getCartByID(getCookie('myCart') ?? '');
      setStateFunc({ ...state, ...cartNew.body });
      console.log(state, 'state');
    };
  } else {
    async () => {
      const cartNew = await getAnonymnusCart();
      setCookie('myCart', cartNew.body.id);
      setStateFunc({ ...state, ...cartNew.body });
    };
  }
};
