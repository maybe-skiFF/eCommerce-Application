import { useContext } from 'react';
import { CustomerContext } from './CustomerProvider';
import { IsAuthContext } from './IsAuthProvider';
import { ProductsContext } from './ProductsProvider';
import { CartContext } from './CartContext';

export const useCustomer = () => useContext(CustomerContext);
export const useIsAuth = () => useContext(IsAuthContext);
export const useProducts = () => useContext(ProductsContext);
export const useCart = () => useContext(CartContext);
