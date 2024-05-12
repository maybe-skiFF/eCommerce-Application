import { AddressInterface } from 'src/utils/interfaces';
export const SERVICE_MESSAGES = {
  signIn: 'Sign in ',
  startCheck: 'start',
  isNoValid: 'Email address must be  formatted (e.g., user@example.com).',
  useLowerCase: 'You must use at least one lowercase letter',
  useUpperCase: 'You must use at least one uppercase letter ',
  useLatin: 'You must use only latin letters',
  useNumber: 'Password must have at least one digit',
  useMore: 'Password must have at least 8 symbols ',
  useDogSign: 'The valid email must contain a symbol @',
  useDomainName: 'Email address must contain a domain name ',
  notEmpty: 'The field cannot be empty',
  checkDone: 'Done',
  rememberMe: 'Remember me ',
  dontUseSpase: 'Password must not contain whitespace.',
  page404Text:
    'The page you are looking for might be removed or is temporarily unavailable',
  noAccount: `Don't have an account?`,
  haveAccount: 'Already have an account?',
  defaultAddress: 'Set as default address',
  day: 'DAY',
  month: 'MONTH',
  year: 'YEAR',
  country: 'COUNTRY',
  postCode: 'POSTCODE',
  city: 'CITY',
  street: 'STREET',
};

export const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const addresses: AddressInterface = {
  Russia: {
    city: ['Saint Peterburg'],
    postCode: ['187015'],
    street: ['Gorokhovaya', 'Naberezhnaya Kutuzova'],
  },
  Belarus: {
    city: ['Minsk'],
    postCode: ['220004'],
    street: ['Aleksandrovskaya', 'Bolotnaya', 'Denisovskiy'],
  },
  Bulgaria: {
    city: ['Sofia'],
    postCode: ['1000'],
    street: ['Alexander Weiner', 'Berezina'],
  },
  USA: {
    city: ['New York'],
    postCode: ['10001'],
    street: ['Columbus Circle', 'Wooster Street'],
  },
};
