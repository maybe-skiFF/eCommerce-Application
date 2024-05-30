import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

import { PROJECT_DATA } from './PROJECT_DATA';
const projectKey = PROJECT_DATA.CTP_PROJECT_KEY ?? '';
const scopes = [PROJECT_DATA.CTP_SCOPES ?? ''];

export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: PROJECT_DATA.CTP_AUTH_URL ?? '',
  projectKey: projectKey,
  credentials: {
    clientId: PROJECT_DATA.CTP_CLIENT_ID ?? '',
    clientSecret: PROJECT_DATA.CTP_CLIENT_SECRET ?? '',
  },
  scopes,
  fetch,
};

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: PROJECT_DATA.CTP_API_URL ?? '',
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withAnonymousSessionFlow(authMiddlewareOptions)
  .build();
