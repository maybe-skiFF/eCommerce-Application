import { useContext } from 'react';
import { CustomerContext } from './CustomerProvider';
import { IsAuthContext } from './IsAuthProvider';
import { ProductsContext } from './ProductsProvider';

export const useCustomer = () => useContext(CustomerContext);
export const useIsAuth = () => useContext(IsAuthContext);
export const useProducts = () => useContext(ProductsContext);
