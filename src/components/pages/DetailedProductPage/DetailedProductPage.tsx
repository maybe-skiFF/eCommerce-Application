import { Product } from '@commercetools/platform-sdk';
import { useParams } from 'react-router-dom';
import { HeaderWrapper } from 'src/components/HeaderWrapper/HeaderWrapper';
import { getProductById } from 'src/serverPart/ApiRoot';

export const DetailedProductPage = () => {
  const { key } = useParams();
  async function productByIdData(): Promise<Product> {
    try {
      const res = await getProductById(key ?? '');
      const data = res.body;
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const data = productByIdData();
  console.log(data);
  return <HeaderWrapper>{key}</HeaderWrapper>;
};
