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

export { getAnonimnusCart };
