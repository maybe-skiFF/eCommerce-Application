import { ctpClient } from './BuildClient';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { customerData } from 'src/utils/interfaces';
import { PROJECT_DATA } from './PROJECT_DATA';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: PROJECT_DATA.CTP_PROJECT_KEY,
});

const getProject = () => {
  return apiRoot.get().execute();
};
const createCustomerDraft = (customerData: customerData) => {
  const {
    firstName,
    lastName,
    email,
    password,
    // key,
    country,
    city,
    street,
    postCode,
  } = customerData;
  return {
    firstName,
    lastName,
    email,
    password,
    // key,
    country,
    city,
    street,
    postCode,
  };
};
const createCustomer = async (customerData: customerData): Promise<void> => {
  await apiRoot
    .customers()
    .post({
      body: createCustomerDraft(customerData),
    })
    .execute();
};

getProject()
  .then(({ body }) => {
    console.log(JSON.stringify(body));
  })
  .catch(console.error);

export { getProject, createCustomer };
