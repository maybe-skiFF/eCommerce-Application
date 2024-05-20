import fetch from 'node-fetch';
import {
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

import { PROJECT_DATA } from './PROJECT_DATA';
const projectKey = PROJECT_DATA.CTP_PROJECT_KEY ?? '';
const scopes = [PROJECT_DATA.CTP_SCOPES ?? ''];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: PROJECT_DATA.CTP_AUTH_URL ?? '',
  projectKey: projectKey,
  credentials: {
    clientId: PROJECT_DATA.CTP_CLIENT_ID ?? '',
    clientSecret: PROJECT_DATA.CTP_CLIENT_SECRET ?? '',
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: PROJECT_DATA.CTP_API_URL ?? '',
  fetch,
};

export const options: PasswordAuthMiddlewareOptions = {
  host: PROJECT_DATA.CTP_AUTH_URL ?? '',
  projectKey: PROJECT_DATA.CTP_PROJECT_KEY,
  credentials: {
    clientId: PROJECT_DATA.CTP_CLIENT_ID,
    clientSecret: PROJECT_DATA.CTP_CLIENT_SECRET,
    user: {
      username: '',
      password: 'password',
    },
  },
  scopes: [`manage_project:${projectKey}`],
  fetch,
};
export const ctpClient = new ClientBuilder()
  // .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const anomClient = new ClientBuilder()
  .withAnonymousSessionFlow(authMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const myClient = new ClientBuilder()
  .withPasswordFlow(options)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
