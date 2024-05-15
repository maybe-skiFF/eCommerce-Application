import { useContext } from 'react';
import { CustomerContext } from './CustomerProvider';

export const useCustomer = () => useContext(CustomerContext);
