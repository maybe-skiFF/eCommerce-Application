import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';

const checkValidationFieldEmail = (value: string): string => {
  const reName = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i);
  let resultCheck = '';
  if (reName.test(value)) {
    resultCheck = SERVICE_MESSAGES.checkDone;
  } else {
    resultCheck = SERVICE_MESSAGES.isNoValid;
  }
  console.log(resultCheck);
  return resultCheck;
};

const checkValidationFieldPassword = (value: string): string => {
  const rePassword = new RegExp(/\d{5,20}/gi);
  let resultCheck = '';
  if (rePassword.test(value)) {
    resultCheck = SERVICE_MESSAGES.checkDone;
  } else {
    resultCheck = SERVICE_MESSAGES.useOnlyNumbers;
  }
  if (value.length < 6) {
    resultCheck = SERVICE_MESSAGES.useMore6;
  }
  console.log(resultCheck);
  return resultCheck;
};
export { checkValidationFieldEmail, checkValidationFieldPassword };
