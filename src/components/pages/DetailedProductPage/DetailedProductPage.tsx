import { Product } from '@commercetools/platform-sdk';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DetailedProductWrapper } from 'src/components/DetailedProductWrapper/DetailedProductWrapper';
import { HeaderWrapper } from 'src/components/HeaderWrapper/HeaderWrapper';
import { getProductById } from 'src/serverPart/ApiRoot';

export const DetailedProductPage = () => {
  const { key } = useParams();
  const [productDataById, setProductDataById] = useState<Product | undefined>();

  useEffect(() => {
    async function productByIdData(): Promise<Product> {
      try {
        const response = await getProductById(key ?? '');
        const data = response.body;
        setProductDataById(data);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    void productByIdData();
  }, [key]);

  return (
    <HeaderWrapper>
      <Container maxWidth={'lg'}>
        <DetailedProductWrapper productDataById={productDataById} />
      </Container>
    </HeaderWrapper>
  );
};
