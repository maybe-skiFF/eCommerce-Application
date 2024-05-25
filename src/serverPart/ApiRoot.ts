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
  return myApiRoot.products().get().execute();
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

interface Category {
  id: string;
  key: string | undefined;
}
const createCategories = async (): Promise<Category[]> => {
  try {
    const response = await myApiRoot.categories().get().execute();
    const categories: Category[] = response.body.results
      .filter(item => !item.parent)
      .map(item => ({
        id: item.id,
        key: item.key
      }));
    return categories;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createProducts = async (categoryId: string) => {
  try {
    const response = await myApiRoot.products().get().execute();
    const products = response.body.results;

    const filteredProducts = products.filter(product => {
      return product.masterData.current.categories.some(category => category.id === categoryId);
    });

    return filteredProducts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

async function getProductsByCategory(categoryId: string) {
  try {
    const products = await createProducts(categoryId);
    console.log(products);
    return products;
  } catch (error) {
    console.error(error);
  }
}

export {
  getProject,
  createCustomer,
  checkCustomer,
  getToken,
  getPasswordFlow,
  createMyCustomer,
  deleteContact,
  getCategories,
  createCategories,
  getProducts,
  getProductsByCategory,
};
