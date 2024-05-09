import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

export const projectKey = 'the-best-store0000';
export const scopes = [
  'manage_my_shopping_lists:the-best-store0000:the-good-store view_cart_discounts:the-best-store0000:the-good-store view_audit_log:the-best-store0000 view_shopping_lists:the-best-store0000:the-good-store view_api_clients:the-best-store0000 manage_orders:the-best-store0000:the-good-store manage_shopping_lists:the-best-store0000:the-good-store manage_api_clients:the-best-store0000 view_customers:the-best-store0000:the-good-store manage_customers:the-best-store0000:the-good-store manage_my_profile:the-best-store0000:the-good-store view_orders:the-best-store0000:the-good-store manage_project:the-best-store0000 manage_cart_discounts:the-best-store0000:the-good-store manage_my_orders:the-best-store0000:the-good-store',
];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com/',
  projectKey: projectKey,
  credentials: {
    clientId: '9UPL95_tnM3XLsiDFYYrrsqU',
    clientSecret: '7U6OLWqWOp35Sw7DX75D_JkaRksl9wHN',
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com/',
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
