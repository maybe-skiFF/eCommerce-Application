import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { CustomerData } from 'src/utils/interfaces';

interface Props {
  children: ReactElement;
}

interface Context {
  customer: CustomerData;
  setCustomer: Dispatch<SetStateAction<CustomerData>>;
}

const intialDataCustomer: CustomerData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  key: '',
  dateOfBirth: '',
  shippingAddressIds: {
    country: '',
    city: '',
    street: '',
    postCode: '',
  },
};

const initialState = {
  customer: intialDataCustomer,
  setCustomer: () => {},
};

export const CustomerContext = createContext<Context>(initialState);

export const CustomerProvider = ({ children }: Props) => {
  const [customer, setCustomer] = useState<CustomerData>(intialDataCustomer);

  return (
    <CustomerContext.Provider value={{ customer, setCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};
// usage example
// const { customer, setCustomer } = useCustomer();
// const handleOnInputName = (event: ChangeEvent<HTMLInputElement>): void => {
//   setCustomer({ ...customer, firstName: event.target.value });
// };
