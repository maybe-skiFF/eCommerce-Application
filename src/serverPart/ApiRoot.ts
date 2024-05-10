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
  const { firstName, lastName, email, password, key, countryCode } =
    customerData;
  return {
    firstName,
    lastName,
    email,
    password,
    key,
    addresses: [
      {
        country: countryCode,
      },
    ],
  };
};
export const createCustomer = async (
  customerData: customerData,
): Promise<void> => {
  await apiRoot
    .customers()
    .post({
      body: createCustomerDraft(customerData),
    })
    .execute();
};

// const getCustomer = () => {
//   return apiRoot.customers().get().execute();
// };
getProject()
  .then(({ body }) => {
    console.log(JSON.stringify(body));
  })
  .catch(console.error);

export { getProject };
