import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';

const reEmail = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
const reUpperCase = new RegExp(/(?=.*[A-Z])./g);
const reLowerCase = new RegExp(/(?=.*[a-z])./g);
const reDigits = new RegExp(/(?=.*\d)./g);

const checkValidationFieldEmail = (value: string): string => {
  return !reEmail.test(value)
    ? SERVICE_MESSAGES.isNoValid
    : value.length < 8
      ? SERVICE_MESSAGES.useMore
      : SERVICE_MESSAGES.checkDone;
};

const checkValidationFieldPassword = (value: string): string => {
  return /\s/.test(value)
    ? SERVICE_MESSAGES.dontUseSpase
    : !reDigits.test(value)
      ? SERVICE_MESSAGES.useNumber
      : value.length < 8
        ? SERVICE_MESSAGES.useMore
        : !reLowerCase.test(value)
          ? SERVICE_MESSAGES.useLowerCase
          : !reUpperCase.test(value)
            ? SERVICE_MESSAGES.useUpperCase
            : SERVICE_MESSAGES.checkDone;
};
export { checkValidationFieldEmail, checkValidationFieldPassword };
