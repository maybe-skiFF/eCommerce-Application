import { useParams } from 'react-router-dom';

export const DetailedProductPage = () => {
  const { key } = useParams();
  return <h1>{key}</h1>;
};
