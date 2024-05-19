export interface Address {
  country: string;
  city: string;
  postalCode: string;
  streetName: string[];
}

export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  key: string;
  dateOfBirth: string;
  addresses: CustomerAddress[];
}
export interface CustomerAddress {
  country: string;
  city: string;
  postalCode: string;
  streetName: string;
}
export interface DataTime {
  day: string[];
  month: string[];
  year: string[];
}
export interface MyProps {
  text: string;
  count: number;
}
