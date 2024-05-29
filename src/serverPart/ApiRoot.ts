import { ctpClient, myClient } from './BuildClient';
import {
  ClientResponse,
  CustomerSignInResult,
  createApiBuilderFromCtpClient,
  CustomerPagedQueryResponse,
  Project,
  ErrorObject,
  // ApiRoot,
  // CustomerToken,
} from '@commercetools/platform-sdk';

import { CustomerData } from 'src/utils/interfaces';
import { PROJECT_DATA } from './PROJECT_DATA';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: PROJECT_DATA.CTP_PROJECT_KEY,
});
const myApiRoot = createApiBuilderFromCtpClient(myClient).withProjectKey({
  projectKey: PROJECT_DATA.CTP_PROJECT_KEY,
});
const getProject = (): Promise<ClientResponse<Project>> => {
  return apiRoot.get().execute();
};
const getToken = (): Promise<ClientResponse<CustomerPagedQueryResponse>> => {
  return myApiRoot.customers().get().execute();
};

const getCategories = () => {
  return myApiRoot.categories().get().execute();
};

const getProducts = () => {
  return myApiRoot
    .products()
    .get({ queryArgs: { limit: 20 } })
    .execute();
};

const getProductById = (ID: string) => {
  return myApiRoot.products().withId({ ID }).get().execute();
};

const createCustomerDraft = (customerData: CustomerData) => {
  const { firstName, lastName, email, password, key, dateOfBirth, addresses } =
    customerData;
  return {
    firstName,
    lastName,
    email,
    password,
    key,
    dateOfBirth,
    addresses,
  };
};

const createCustomer = async (
  customerData: CustomerData,
): Promise<ErrorObject | ClientResponse<CustomerSignInResult>> => {
  return await apiRoot
    .customers()
    .post({
      body: createCustomerDraft(customerData),
    })
    .execute();
};
const createMyCustomer = async (
  name: string,
  password: string,
): Promise<ClientResponse> => {
  return await myApiRoot
    .customers()
    .post({
      body: {
        email: name,
        password: password,
      },
    })
    .execute();
};
const getPasswordFlow = async (
  // BEARER_TOKEN: string,
  email: string,
  password: string,
) => {
  await apiRoot
    .customers()
    .get({
      queryArgs: {
        where: [`email="${email}"`, `password="${password}"`],
      },
    })
    .execute();
};
const checkCustomer = async (
  email: string,
): Promise<ClientResponse<CustomerPagedQueryResponse>> => {
  return await apiRoot
    .customers()
    .get({
      queryArgs: {
        where: `email="${email}"`,
      },
    })
    .execute();
};

const deleteContact = async (id: string) => {
  return await apiRoot
    .customers()
    .get({
      queryArgs: {
        where: `email="${id}"`,
      },
    })
    .execute();
};

export {
  getProject,
  createCustomer,
  checkCustomer,
  getToken,
  getPasswordFlow,
  createMyCustomer,
  deleteContact,
  getCategories,
  getProducts,
  getProductById,
};
