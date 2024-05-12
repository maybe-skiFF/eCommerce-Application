export interface customerData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  key: string;
  countryCode: string;
}

export interface AddressInterface {
  Russia: CountryInterface;
  Belarus: CountryInterface;
  Bulgaria: CountryInterface;
  USA: CountryInterface;
}
export interface CountryInterface {
  city: string[];
  postCode: string[];
  street: string[];
}
