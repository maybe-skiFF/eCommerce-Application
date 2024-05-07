import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';

const reEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
const rePassword = new RegExp(/[a-zA-Z]{8,20}/g);
const checkValidationFieldEmail = (value: string): string => {
  return reEmail.test(value)
    ? SERVICE_MESSAGES.checkDone
    : SERVICE_MESSAGES.isNoValid;
};

const checkValidationFieldPassword = (value: string): string => {
  let resultCheck = '';
  if (rePassword.test(value)) {
    resultCheck = SERVICE_MESSAGES.checkDone;
  } else {
    resultCheck = SERVICE_MESSAGES.useOnlyNumbers;
  }

  if (value.length < 8) {
    resultCheck = SERVICE_MESSAGES.useMore;
  }
  return resultCheck;
};
export { checkValidationFieldEmail, checkValidationFieldPassword };
