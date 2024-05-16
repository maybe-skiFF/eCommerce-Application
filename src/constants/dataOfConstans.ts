import { Address } from 'src/utils/interfaces';

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

export const addresses: Address[] = [
  {
    country: '',
    city: '',
    postCode: '',
    street: [''],
  },
  {
    country: 'Russia',
    city: 'Saint Peterburg',
    postCode: '187015',
    street: ['Gorokhovaya', 'Naberezhnaya Kutuzova'],
  },
  {
    country: 'Belarus',
    city: 'Minsk',
    postCode: '220004',
    street: ['Aleksandrovskaya', 'Bolotnaya', 'Denisovskiy'],
  },
  {
    country: 'Bulgaria',
    city: 'Sofia',
    postCode: '1000',
    street: ['Alexander Weiner', 'Berezina'],
  },
  {
    country: 'USA',
    city: 'New York',
    postCode: '10001',
    street: ['Columbus Circle', 'Wooster Street'],
  },
];
