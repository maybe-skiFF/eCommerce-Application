import { Address } from 'src/utils/interfaces';

export const months: string[] = [
  'January 00',
  'February 01',
  'March 02',
  'April 03',
  'May 04',
  'June 05',
  'July 06',
  'August 07',
  'September 08',
  'October 09',
  'November 10',
  'December 11',
];

export const addresses: Address[] = [
  {
    country: '',
    city: '',
    postalCode: '',
    streetName: [''],
  },
  {
    country: 'Russia RU',
    city: 'St.Petersburg',
    postalCode: '187015',
    streetName: ['Gorokhovaya', 'Naberezhnaya Kutuzova'],
  },
  {
    country: 'Belarus BY',
    city: 'Minsk',
    postalCode: '220004',
    streetName: ['Aleksandrovskaya', 'Bolotnaya', 'Denisovskiy'],
  },
  {
    country: 'Bulgaria BG',
    city: 'Sofia',
    postalCode: '1000',
    streetName: ['Alexander Weiner', 'Berezina'],
  },
  {
    country: 'USA US',
    city: 'NYork',
    postalCode: '10001',
    streetName: ['Columbus Circle', 'Wooster Street'],
  },
];
