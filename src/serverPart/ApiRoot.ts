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
  Address,
} from '@commercetools/platform-sdk';

import { CustomerData } from 'src/utils/interfaces';
import { PROJECT_DATA } from './PROJECT_DATA';
import {
  PasswordAuthMiddlewareOptions,
  ClientBuilder,
} from '@commercetools/sdk-client-v2';

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
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
    .get({ queryArgs: { limit: 100 } })
    .execute();
};

const getCategory = () => {
  return apiRoot
    .categories()
    .withId({ ID: 'b04d2872-18da-4f58-9ecc-6880a2702877' })
    .get()
    .execute();
};

const getPartOfProducts = (numberPage: number) => {
  return apiRoot
    .products()
    .get({ queryArgs: { limit: 8, offset: 8 * numberPage } })
    .execute();
};

console.log(getCategory());
const getProductById = (ID: string) => {
  return apiRoot.products().withId({ ID }).get().execute();
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
): Promise<ClientResponse<CustomerSignInResult>> => {
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

const updateCustomerPassword = async (
  email: string,
  oldPassword: FormDataEntryValue,
  newPassword: FormDataEntryValue,
): Promise<ClientResponse<Customer>> => {
  try {
    const api = getApiWithCredentials(email, oldPassword as string);
    const myCustomer = await getMyCustomer(api, email, oldPassword as string);
    const customerUpdate = await api
      .customers()
      .password()
      .post({
        body: {
          id: myCustomer.body.customer.id,
          version: myCustomer.body.customer.version,
          currentPassword: oldPassword as string,
          newPassword: newPassword as string,
        },
      })
      .execute();
    return customerUpdate;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateCustomerEmail = async (
  id: string,
  version: number,
  email: FormDataEntryValue,
): Promise<ClientResponse<Customer>> => {
  return await apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version: version,
        actions: [{ action: 'changeEmail', email: email as string }],
      },
    })
    .execute();
};

const updateCustomerFirstName = async (
  id: string,
  version: number,
  fieldName: FormDataEntryValue,
): Promise<ClientResponse<Customer>> => {
  return await apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version: version,
        actions: [{ action: 'setFirstName', firstName: fieldName as string }],
      },
    })
    .execute();
};

const updateCustomerDataOfBirth = async (
  id: string,
  version: number,
  fieldName: FormDataEntryValue,
): Promise<ClientResponse<Customer>> => {
  return await apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version: version,
        actions: [
          { action: 'setDateOfBirth', dateOfBirth: fieldName as string },
        ],
      },
    })
    .execute();
};

const updateCustomerLastName = async (
  id: string,
  version: number,
  fieldName: FormDataEntryValue,
): Promise<ClientResponse<Customer>> => {
  return await apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version: version,
        actions: [{ action: 'setLastName', lastName: fieldName as string }],
      },
    })
    .execute();
};

const createAddress = async (
  id: string,
  version: number,
  data: Address,
): Promise<ClientResponse<Customer>> => {
  return await apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version: version,
        actions: [{ action: 'addAddress', address: data }],
      },
    })
    .execute();
};

const deleteAddress = async (
  id: string,
  version: number,
  fieldName: string,
): Promise<ClientResponse<Customer>> => {
  return await apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version: version,
        actions: [{ action: 'removeAddress', addressId: fieldName }],
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
  getApiWithCredentials,
  getMyCustomer,
  checkCustomer,
  updateCustomerEmail,
  updateCustomerFirstName,
  updateCustomerLastName,
  updateCustomerDataOfBirth,
  updateCustomerPassword,
  deleteContact,
  createAddress,
  deleteAddress,
  getCategories,
  getProducts,
  getProductById,
  getPartOfProducts,
};
