import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';

const reEmail = new RegExp(/[\w+]@[\w+]\.[\w+]{2,30}/);
const reDomain = new RegExp(/[a-z+]\.[\w+]{2,10}$/);
const reDogSign = new RegExp(/(?=.*@)./g);
const reLatin = new RegExp(/[a-z+]/gi);
const reUpperCase = new RegExp(/(?=.*[A-Z])./g);
const reLowerCase = new RegExp(/(?=.*[a-z])./g);
const reDigits = new RegExp(/(?=.*\d)./g);

const checkValidationFieldEmail = (value: string): string => {
  if (!reDomain.test(value)) {
    return SERVICE_MESSAGES.useDomainName;
  }
  if (value.match(/\s/)) {
    return SERVICE_MESSAGES.dontUseSpase;
  }
  if (!value.match(reDogSign)) {
    return SERVICE_MESSAGES.useDogSign;
  }
  if (reEmail.test(value)) {
    return SERVICE_MESSAGES.isNoValid;
  }
  return SERVICE_MESSAGES.checkDone;
};

const checkValidationFieldPassword = (value: string): string => {
  if (value.match(/\s/)) {
    return SERVICE_MESSAGES.dontUseSpase;
  }
  if (!value.match(reLatin)) {
    return SERVICE_MESSAGES.useLatin;
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

const checkValidationTextField = (value: string): string => {
  if (value.match(/\s/)) {
    return SERVICE_MESSAGES.dontUseSpase;
  }
  if (!value.match(reLatin)) {
    return SERVICE_MESSAGES.useLatin;
  }
  if (!value.match(reLowerCase)) {
    return SERVICE_MESSAGES.useLowerCase;
  }
  if (!value.match(reUpperCase)) {
    return SERVICE_MESSAGES.useUpperCase;
  }
  if (value.length < 2) {
    return SERVICE_MESSAGES.useMore2;
  }
  return SERVICE_MESSAGES.checkDone;
};

export {
  checkValidationFieldEmail,
  checkValidationFieldPassword,
  checkValidationTextField,
};
