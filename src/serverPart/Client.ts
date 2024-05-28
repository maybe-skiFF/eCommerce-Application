import {
  ClientBuilder,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { PROJECT_DATA } from './PROJECT_DATA';
import {
  authMiddlewareOptions,
  httpMiddlewareOptions,
  options,
} from './BuildClient';

const refreshOptions: RefreshAuthMiddlewareOptions = {
  host: PROJECT_DATA.CTP_AUTH_URL ?? '',
  projectKey: PROJECT_DATA.CTP_PROJECT_KEY,
  credentials: {
    clientId: PROJECT_DATA.CTP_CLIENT_ID,
    clientSecret: PROJECT_DATA.CTP_CLIENT_SECRET,
  },
  refreshToken: '',
  fetch,
};

export const myClient = new ClientBuilder()
  .withRefreshTokenFlow(refreshOptions)
  .withPasswordFlow(options)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
