import { ctpClient } from './BuildClient';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: 'the-best-store0000',
});

export const getProject = () => {
  console.log(apiRoot.get());
  // return apiRoot.get().execute();
  return apiRoot.get().execute();
};

getProject()
  .then(data => {
    console.log(data.statusCode);
  })
  .catch(console.error);
// console.log(JSON.stringify(getProject()));
