export interface customerData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // key: string;
  dataOfBirdth: string;
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
