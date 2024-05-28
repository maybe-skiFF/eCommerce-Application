import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';

export const checkFullData = (object: object): boolean => {
  console.log(
    Object.values(object).every(value => value !== SERVICE_MESSAGES.startCheck),
    'check',
  );
  return Object.values(object).every(
    value => value !== SERVICE_MESSAGES.startCheck,
  );
};
