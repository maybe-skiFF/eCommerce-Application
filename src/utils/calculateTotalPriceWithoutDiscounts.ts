import { Cart } from '@commercetools/platform-sdk';

export const calculateTotalPriceWithoutDiscount = (myCart: Cart) => {
  return myCart.lineItems.reduce((acc, curr): number => {
    return acc + curr.totalPrice.centAmount;
  }, 0);
};
