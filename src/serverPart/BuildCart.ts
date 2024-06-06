// import {
//   authMiddlewareOptions,
//   ctpClient,
//   httpMiddlewareOptions,
// } from './BuildClient';
import { apiRoot } from './ApiRoot';
// import { PROJECT_DATA } from './PROJECT_DATA';
import { ClientResponse, Cart } from '@commercetools/platform-sdk';

const getAnonimnusCart = (): Promise<ClientResponse<Cart>> => {
  return apiRoot
    .carts()
    .post({ body: { currency: 'EUR' } })
    .execute();
};

const getAnonimnusCartByID = (
  IDCart: string,
): Promise<ClientResponse<Cart>> => {
  return apiRoot.carts().withId({ ID: IDCart }).get().execute();
};

const updateAnonimnusCartByID = (
  IDCart: string,
  version: number,
  IDProduct: string,
): Promise<ClientResponse<Cart>> => {
  return apiRoot
    .carts()
    .withId({ ID: IDCart })
    .post({
      body: {
        version: version,
        actions: [{ action: 'addLineItem', productId: IDProduct }],
      },
    })
    .execute();
};
export { getAnonimnusCart, getAnonimnusCartByID, updateAnonimnusCartByID };
