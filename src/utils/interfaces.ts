export interface customerData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  key: string;
  dateOfBirth: string;
  country: string;
  city: string;
  postCode: string;
  street: string;
}
export interface Address {
  country: string;
  city: string[];
  postCode: string[];
  street: string[];
}

export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  key: string;
  dateOfBirth: string;
  address: CustomerAddress;
}
export interface CustomerAddress {
  country: string;
  city: string;
  postCode: string;
  street: string;
}
export interface DataTime {
  day: string[];
  month: string[];
  year: string[];
}
