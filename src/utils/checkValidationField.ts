import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';

const reEmail = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,5}$/g);
const reUpperCase = new RegExp(/(?=.*[A-Z])./g);
const reLowerCase = new RegExp(/(?=.*[a-z])./g);
const reDigits = new RegExp(/(?=.*\d)./g);

const checkValidationFieldEmail = (value: string): string => {
  let resultCheck: string;
  if (!reEmail.test(value)) {
    resultCheck = SERVICE_MESSAGES.isNoValid;
  } else if (value.length < 8) {
    resultCheck = SERVICE_MESSAGES.useMore;
  } else {
    resultCheck = SERVICE_MESSAGES.checkDone;
  }
  return resultCheck;
};

const checkValidationFieldPassword = (value: string): string => {
  let resultCheck: string = SERVICE_MESSAGES.checkDone;
  if (value.match(/\s/)) {
    resultCheck = SERVICE_MESSAGES.dontUseSpase;
  }
  if (!value.match(reDigits)) {
    resultCheck = SERVICE_MESSAGES.useNumber;
  }
  if (!value.match(reLowerCase)) {
    resultCheck = SERVICE_MESSAGES.useLowerCase;
  }
  if (!value.match(reUpperCase)) {
    resultCheck = SERVICE_MESSAGES.useUpperCase;
  }
  if (value.length < 8) {
    resultCheck = SERVICE_MESSAGES.useMore;
  }
  return resultCheck;
};
export { checkValidationFieldEmail, checkValidationFieldPassword };
