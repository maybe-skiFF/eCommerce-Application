import { Customer } from '@commercetools/platform-sdk';

export const selectionZone = (customer: Customer): string => {
  const country = customer.addresses[0].country;
  let zone: string;
  switch (country) {
    case 'US':
      zone = 'US';
      break;
    case 'BG':
      zone = 'EZ';
      break;
    case 'BY':
      zone = 'RU';
      break;
    case 'RU':
      zone = 'RU';
      break;
    default:
      zone = 'US';
  }
  return zone;
};
