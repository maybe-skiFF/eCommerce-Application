import { ctpClient } from './BuildClient';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { CustomerData } from 'src/utils/interfaces';
import { PROJECT_DATA } from './PROJECT_DATA';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: PROJECT_DATA.CTP_PROJECT_KEY,
});

const getProject = () => {
  return apiRoot.get().execute();
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
const createCustomer = async (customerData: CustomerData): Promise<void> => {
  await apiRoot
    .customers()
    .post({
      body: createCustomerDraft(customerData),
    })
    .execute();
};
const checkCustomer = async (email: string): Promise<void> => {
  await apiRoot
    .customers()
    .get({
      queryArgs: {
        where: `email="${email}"`,
      },
    })
    .execute();
};
getProject()
  .then(({ body }) => {
    console.log(JSON.stringify(body));
  })
  .catch(console.error);

export { getProject, createCustomer, checkCustomer };
