import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';

export const checkFullData = (object: object): boolean => {
  return Object.values(object).every(
    value => value !== SERVICE_MESSAGES.startCheck,
  );
};
