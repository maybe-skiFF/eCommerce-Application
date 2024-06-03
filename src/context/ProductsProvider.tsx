import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { ProductData } from 'src/utils/interfaces';

interface Props {
  children: ReactElement;
}

interface Context {
  productsData: ProductData;
  setProductsData: Dispatch<SetStateAction<ProductData>>;
}

const initialProductsData: ProductData = {
  id: '',
  key: '' || undefined,
  masterData: {
    current: {
      description: {
        'en-US': '',
      },
      masterVariant: {
        images: [
          {
            url: '',
          },
        ],
        prices: [
          {
            discounted: {
              value: {
                centAmount: 0,
              },
            },
            value: {
              centAmount: 0,
            },
          },
        ],
      },
    },
  },
};

const initialState = {
  productsData: initialProductsData,
  setProductsData: () => {},
};

export const ProductsContext = createContext<Context>(initialState);

export const ProductsProvider = ({ children }: Props) => {
  const [productsData, setProductsData] =
    useState<ProductData>(initialProductsData);

  return (
    <ProductsContext.Provider value={{ productsData, setProductsData }}>
      {children}
    </ProductsContext.Provider>
  );
};
