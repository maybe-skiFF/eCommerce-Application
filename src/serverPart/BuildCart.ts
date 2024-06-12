import { apiRoot } from './ApiRoot';

import {
  ClientResponse,
  Cart,
  Customer,
  ByProjectKeyRequestBuilder,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';

const getAnonymnusCart = (): Promise<ClientResponse<Cart>> => {
  return apiRoot
    .carts()
    .post({ body: { currency: 'USD' } })
    .execute();
};

const createCustomerCart = (api: ByProjectKeyRequestBuilder) => {
  return api
    .me()
    .carts()
    .post({ body: { currency: 'USD', country: 'US' } })
    .execute();
};

const getCartByID = (IDCart: string): Promise<ClientResponse<Cart>> => {
  return apiRoot.carts().withId({ ID: IDCart }).get().execute();
};

const getMyCart = (api: ByProjectKeyRequestBuilder) => {
  return api.me().activeCart().get().execute();
};

const getMergeCart = async (
  api: ByProjectKeyRequestBuilder,
  name: string,
  password: string,
  idCard: string,
): Promise<ClientResponse<CustomerSignInResult>> => {
  return await api
    .login()
    .post({
      body: {
        email: name,
        password: password,
        anonymousCart: {
          id: idCard,
          typeId: 'cart',
        },
        updateProductData: true,
      },
    })
    .execute();
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

const addProductToCartByID = (
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

const changeProductQuantityToCartByID = (
  IDCart: string,
  version: number,
  IDProduct: string,
  quantytyProduct: number,
): Promise<ClientResponse<Cart>> => {
  return apiRoot
    .carts()
    .withId({ ID: IDCart })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId: IDProduct,
            quantity: quantytyProduct,
          },
        ],
      },
    })
    .execute();
};

const removeProductToCartByID = (
  IDCart: string,
  version: number,
  IDProduct: string,
  quantytyProduct: number,
): Promise<ClientResponse<Cart>> => {
  return apiRoot
    .carts()
    .withId({ ID: IDCart })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId: IDProduct,
            quantity: quantytyProduct,
          },
        ],
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

const removeAllFromCart = (
  IDCart: string,
  version: number,
  arr: {
    action: 'removeLineItem';
    lineItemId: string;
    quantity: number;
  }[],
): Promise<ClientResponse<Cart>> => {
  return apiRoot
    .carts()
    .withId({ ID: IDCart })
    .post({
      body: {
        version: version,
        actions: arr,
      },
    })
    .execute();
};

const createDiscount = (code: string, cartDiscountId: string) => {
  return apiRoot.discountCodes().post({
    body: {
      code: code,
      name: {
        en: 'RSS',
      },
      cartDiscounts: [
        {
          typeId: 'cart-discount',
          id: cartDiscountId,
        },
      ],
      isActive: true,
    },
  });
};

const checkDiscount = (code: string) => {
  return apiRoot.discountCodes().withKey({ key: code }).get().execute();
};

const addDiscountToCart = (
  IDCart: string,
  version: number,

  code: string,
): Promise<ClientResponse<Cart>> => {
  return apiRoot
    .carts()
    .withId({ ID: IDCart })
    .post({
      body: {
        version: version,
        actions: [{ action: 'addDiscountCode', code: code }],
      },
    })
    .execute();
};

export {
  getAnonymnusCart,
  createCustomerCart,
  getCartByID,
  addProductToCartByID,
  changeProductQuantityToCartByID,
  removeProductToCartByID,
  setCountryForCart,
  getCustomerCart,
  setCustomerIDByCart,
  isCustomerExist,
  getMergeCart,
  getMyCart,
  removeAllFromCart,
  createDiscount,
  checkDiscount,
  addDiscountToCart,
};
