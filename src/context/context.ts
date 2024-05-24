import { useContext } from 'react';
import { CustomerContext } from './CustomerProvider';
import { IsAuthContext } from './IsAuthProvider';

export const useCustomer = () => useContext(CustomerContext);
export const useIsAuth = () => useContext(IsAuthContext);
