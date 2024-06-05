import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { CustomerData } from 'src/utils/interfaces';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
interface Props {
  children: ReactElement;
}

interface Context {
  customer: CustomerData;
  setCustomer: Dispatch<SetStateAction<CustomerData>>;
}

const intialDataCustomer: CustomerData = {
  firstName: SERVICE_MESSAGES.startCheck,
  lastName: SERVICE_MESSAGES.startCheck,
  email: SERVICE_MESSAGES.startCheck,
  password: SERVICE_MESSAGES.startCheck,
  key: Date.now().toString(),
  dateOfBirth: SERVICE_MESSAGES.startCheck,
  addresses: [
    {
      country: SERVICE_MESSAGES.startCheck,
      city: SERVICE_MESSAGES.startCheck,
      streetName: SERVICE_MESSAGES.startCheck,
      postalCode: SERVICE_MESSAGES.startCheck,
    },
  ],
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
