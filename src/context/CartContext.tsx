import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { Cart } from '@commercetools/platform-sdk';
import { getCookie } from 'src/utils/cookieWork';
import { getCartByID } from 'src/serverPart/BuildCart';

interface Props {
  children: ReactElement;
}

interface Context {
  cart: Cart;
  setCart: Dispatch<SetStateAction<Cart>>;
}

const mayBeCart =await getCartByID(getCookie('myCart')??'');

const intialDataCart: Cart = getCookie('myCart') ? mayBeCart.body : {
  cartState: '',
  country: 'US',
  createdAt: '',
  createdBy: {
    anonymousId: '',
    clientId: '',
  },
  customLineItems: [],
  deleteDaysAfterLastModification: 90,
  directDiscounts: [],
  discountCodes: [],
  id: '',
  inventoryMode: 'None',
  itemShippingAddresses: [],
  lastModifiedAt: '',
  lastModifiedBy: {},
  lineItems: [],
  origin: 'Customer',
  refusedGifts: [],
  shipping: [],
  shippingMode: 'Single',
  taxCalculationMode: 'LineItemLevel',
  taxMode: 'Platform',
  taxRoundingMode: 'HalfEven',
  totalLineItemQuantity: 3,
  totalPrice: {
    type: 'centPrecision',
    currencyCode: '',
    centAmount: 0,
    fractionDigits: 0,
  },
  version: 18,
};

const initialState = {
  cart: intialDataCart,
  setCart: () => {},
};

export const CartContext = createContext<Context>(initialState);

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<Cart>(intialDataCart);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

