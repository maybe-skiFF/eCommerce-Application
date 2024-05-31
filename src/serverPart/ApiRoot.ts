import {
  authMiddlewareOptions,
  ctpClient,
  httpMiddlewareOptions,
} from './BuildClient';
import {
  ClientResponse,
  CustomerSignInResult,
  createApiBuilderFromCtpClient,
  Project,
  ErrorObject,
  ByProjectKeyRequestBuilder,
  Customer,
} from '@commercetools/platform-sdk';

import { CustomerData } from 'src/utils/interfaces';
import { PROJECT_DATA } from './PROJECT_DATA';
import {
  PasswordAuthMiddlewareOptions,
  ClientBuilder,
} from '@commercetools/sdk-client-v2';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: PROJECT_DATA.CTP_PROJECT_KEY,
});

const getProject = (): Promise<ClientResponse<Project>> => {
  return apiRoot.get().execute();
};

const getApiWithCredentials = (
  name: string,
  password: string,
): ByProjectKeyRequestBuilder => {
  const options: PasswordAuthMiddlewareOptions = {
    host: PROJECT_DATA.CTP_AUTH_URL ?? '',
    projectKey: PROJECT_DATA.CTP_PROJECT_KEY,
    credentials: {
      clientId: PROJECT_DATA.CTP_CLIENT_ID,
      clientSecret: PROJECT_DATA.CTP_CLIENT_SECRET,
      user: {
        username: name,
        password: password,
      },
    },
    scopes: [`manage_project:${PROJECT_DATA.CTP_PROJECT_KEY}`],
    fetch,
  };
  const client = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withLoggerMiddleware()
    .withPasswordFlow(options)
    .build();
  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: PROJECT_DATA.CTP_PROJECT_KEY,
  });
};
const getCategories = () => {
  return apiRoot.categories().get().execute();
};

const getProducts = () => {
  return apiRoot
    .products()
    .get({ queryArgs: { limit: 20 } })
    .execute();
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

const getMyCustomer = async (
  api: ByProjectKeyRequestBuilder,
  name: string,
  password: string,
): Promise<ClientResponse> => {
  return await api
    .me()
    .login()
    .post({
      body: {
        email: name,
        password: password,
        updateProductData: true,
        activeCartSignInMode: 'MergeWithExistingCustomerCart',
      },
    })
    .execute();
};

const checkCustomer = async (id: string): Promise<ClientResponse<Customer>> => {
  return await apiRoot.customers().withId({ ID: id }).get().execute();
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
  getApiWithCredentials,
  getMyCustomer,
  checkCustomer,
  deleteContact,
  getCategories,
  getProducts,
};
