import { Address } from '@commercetools/platform-sdk';

export const getAddressesArray = (
  nameForms: string[],
  addresses: Address[],
  data: FormData,
): void => {
  nameForms.map(name => {
    addresses.push({
      country: data.get(`country ${name}`) as string,
      city: data.get(`city ${name}`) as string,
      streetName: data.get(`street ${name}`) as string,
      postalCode: data.get(`postalCode ${name}`) as string,
    });
  });
};
