import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';

export const checkAddress = (
  country: string,
  city: string,
  street: string,
  postalCode: string,
): string => {
  if (country !== '' && city !== '' && street !== '' && postalCode !== '') {
    return SERVICE_MESSAGES.checkDone;
  }
  return SERVICE_MESSAGES.startCheck;
};
