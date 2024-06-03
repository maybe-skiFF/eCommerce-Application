import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Link,
} from '@mui/material';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { ProductPure, ShopCardProps } from 'src/utils/interfaces';
import { Link as ReactLink } from 'react-router-dom';

function sortProductsByKeyAscending(products: ProductPure[]) {
  return products.sort((a, b) => {
    const keyA = (a.key ?? '').toLowerCase();
    const keyB = (b.key ?? '').toLowerCase();

    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
}

function sortProductsByKeyDescending(products: ProductPure[]) {
  return products.sort((a, b) => {
    const keyA = (a.key ?? '').toLowerCase();
    const keyB = (b.key ?? '').toLowerCase();

    if (keyA > keyB) return -1;
    if (keyA < keyB) return 1;
    return 0;
  });
}

function sortProductsByPriceAscending(products: ProductPure[]) {
  return products.sort((a, b) => {
    const keyA = a.price;
    const keyB = b.price;

    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
}

function sortProductsByPriceDescending(products: ProductPure[]) {
  return products.sort((a, b) => {
    const keyA = a.price;
    const keyB = b.price;

    if (keyA > keyB) return -1;
    if (keyA < keyB) return 1;
    return 0;
  });
}

export function ShopCard({ products, sortValue }: ShopCardProps) {
  const sortProducts = (products: ProductPure[]) => {
    switch (sortValue) {
      case SERVICE_MESSAGES.sortCategory_1:
        return sortProductsByKeyAscending(products);
      case SERVICE_MESSAGES.sortCategory_2:
        return sortProductsByKeyDescending(products);
      case SERVICE_MESSAGES.sortCategory_3:
        return sortProductsByPriceAscending(products);
      case SERVICE_MESSAGES.sortCategory_4:
        return sortProductsByPriceDescending(products);
      default:
        return products;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      {products && products.length > 0 ? (
        sortProducts(products).map(product => (
          <Card
            key={product.id}
            sx={{
              width: '30%',
              height: '600px',
              border: '1px solid #ebedf0',
              marginBottom: '40px',
              boxSizing: 'border-box',
              cursor: 'pointer',
            }}
          >
            <Link
              component={ReactLink}
              to={`/catalog/${product.id}`}
              color={'inherit'}
              underline="none"
            >
              <CardMedia
                component="div"
                image={product.image}
                sx={{
                  width: '100%',
                  height: '300px',
                  boxSizing: 'border-box',
                  border: '1px solid #ebedf0',
                  padding: '0',
                  backgroundSize: 'contain',
                }}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ marginBottom: '10px', fontWeight: '500' }}
                >
                  {product.key}
                </Typography>
                <Typography variant="body1" sx={{ height: '80px' }}>
                  {product.description.length > 100
                    ? `${product.description.substring(0, 100)}...`
                    : product.description}
                </Typography>
                {!isNaN(product.discount) ? (
                  <Box sx={{ height: '80px' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        textDecoration: 'line-through',
                        color: 'text.secondary',
                      }}
                    >
                      {product.price / 100} EUR
                    </Typography>
                    <Typography
                      sx={{ color: 'red', fontWeight: '700' }}
                      variant="h6"
                    >
                      {product.discount / 100} EUR - with discount
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ height: '80px' }}>
                    <Typography variant="h6">
                      {product.price / 100} EUR
                    </Typography>
                  </Box>
                )}
                <Button
                  onClick={e => {
                    e.preventDefault();
                  }}
                  variant="outlined"
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Link>
          </Card>
        ))
      ) : (
        <Typography variant="h6">no products to display.</Typography>
      )}
    </Box>
  );
}
