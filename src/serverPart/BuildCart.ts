// import {
//   authMiddlewareOptions,
//   ctpClient,
//   httpMiddlewareOptions,
// } from './BuildClient';
import { apiRoot } from './ApiRoot';
// import { PROJECT_DATA } from './PROJECT_DATA';
import { ClientResponse, Cart, Customer } from '@commercetools/platform-sdk';

const getAnonimnusCart = (): Promise<ClientResponse<Cart>> => {
  return apiRoot
    .carts()
    .post({ body: { currency: 'USD' } })
    .execute();
};

const getCartByID = (IDCart: string): Promise<ClientResponse<Cart>> => {
  return apiRoot.carts().withId({ ID: IDCart }).get().execute();
};

const setCountryForCart = (
  IDCart: string,
  version: number,
  country: string,
): Promise<ClientResponse<Cart>> => {
  return apiRoot
    .carts()
    .withId({ ID: IDCart })
    .post({
      body: {
        version: version,
        actions: [{ action: 'setCountry', country: country }],
      },
    })
    .execute();
};

const updateCartByID = (
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

const setCustomerIDByCart = (
  IDCart: string,
  version: number,
  IDCustomer: string,
): Promise<ClientResponse<Cart>> => {
  return apiRoot
    .carts()
    .withId({ ID: IDCart })
    .post({
      body: {
        version: version,
        actions: [{ action: 'setCustomerId', customerId: IDCustomer }],
      },
    })
    .execute();
};

const isCustomerExist = (
  customerID: string,
): Promise<ClientResponse<Customer>> => {
  return apiRoot.customers().withId({ ID: customerID }).get().execute();
};

const getCustomerCart = (customerID: string): Promise<ClientResponse<Cart>> => {
  return apiRoot
    .carts()
    .withCustomerId({ customerId: customerID })
    .get()
    .execute();
};

export {
  getAnonimnusCart,
  getCartByID,
  updateCartByID,
  setCountryForCart,
  getCustomerCart,
  setCustomerIDByCart,
  isCustomerExist,
};
