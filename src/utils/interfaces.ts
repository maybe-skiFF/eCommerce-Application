export interface customerData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  key: string;
  dataOfBirdth: string;
  address: CustomerAddress;
}
export interface Address {
  country: string;
  city: string[];
  postCode: string[];
  street: string[];
}
export interface CustomerAddress {
  country: string;
  city: string;
  postCode: string;
  street: string;
}
