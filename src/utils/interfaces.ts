import { CustomerSignInResult, ErrorObject } from '@commercetools/platform-sdk';
import { ClientResponse } from '@commercetools/sdk-client-v2';
import { ErrorResponse } from 'react-router-dom';

export interface Address {
  country: string;
  city: string;
  postalCode: string;
  streetName: string[];
}

export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  key: string;
  dateOfBirth: string;
  addresses: CustomerAddress[];
}

export interface CustomerAddress {
  country: string;
  city: string;
  postalCode: string;
  streetName: string;
}

export interface DataTime {
  day: string[];
  month: string[];
  year: string[];
}

export interface AddressProps {
  text?: string;
  count?: number;
  value?: string;
}

export interface CustomerServerData {
  addresses: CustomerAddress[];
  email: string;
  firstName: string;
  id: string;
  isEmailVerified: boolean;
  lastName: string;
  password: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  authenticationMode: string;
  stores?: [];
}

export interface CustomerPagedQueryResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: CustomerServerData[];
}

export interface CreatedBy {
  clientId: string;
  isPlatformClient: boolean;
}

export interface Response {
  body: ClientResponse<CustomerSignInResult>;
  error: ErrorObject | ErrorResponse;
  statusCode: number;
}

export interface Category {
  id: string | undefined;
  key: string | undefined;
}

export interface ProductData {
  id: string;
  key: string | undefined;
  masterData: {
    current: {
      description: {
        'en-US': string;
      };
      masterVariant: {
        images: {
          url: string;
        }[];
        prices: {
          value: {
            centAmount: number;
          };
        }[];
      };
    };
  };
}

export interface ProductPure {
  id: string;
  key: string | undefined;
  description: string;
  image: string;
  price: number;
}

export interface ShopCardProps {
  products: ProductPure[];
}

export interface CategoryChoiceSubProps {
  isVisible: boolean;
  selectedKey: string | null;
  handleChangeProp: (
    event: React.MouseEvent<HTMLElement>,
    newCategory: string | null
  ) => void;
}
