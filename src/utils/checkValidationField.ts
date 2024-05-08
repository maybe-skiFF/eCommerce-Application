import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';

const reEmail = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,5}$/g);
const reUpperCase = new RegExp(/(?=.*[A-Z])./g);
const reLowerCase = new RegExp(/(?=.*[a-z])./g);
const reDigits = new RegExp(/(?=.*\d)./g);

const checkValidationFieldEmail = (value: string): string => {
  if (!reEmail.test(value)) {
    return SERVICE_MESSAGES.isNoValid;
  }
  if (value.length < 8) {
    return SERVICE_MESSAGES.useMore;
  }
  return SERVICE_MESSAGES.checkDone;
};

const checkValidationFieldPassword = (value: string): string => {
  if (value.match(/\s/)) {
    return SERVICE_MESSAGES.dontUseSpase;
  }
  if (!value.match(reDigits)) {
    return SERVICE_MESSAGES.useNumber;
  }
  if (!value.match(reLowerCase)) {
    return SERVICE_MESSAGES.useLowerCase;
  }
  if (!value.match(reUpperCase)) {
    return SERVICE_MESSAGES.useUpperCase;
  }
  if (value.length < 8) {
    return SERVICE_MESSAGES.useMore;
  }
  return SERVICE_MESSAGES.checkDone;
};
export { checkValidationFieldEmail, checkValidationFieldPassword };
