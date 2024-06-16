import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Link,
} from '@mui/material';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { ProductPure, ShopCardProps } from 'src/utils/interfaces';
import { useState, ChangeEvent } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { SkeletonComponent } from '../skeleton/skeletonComponent';

export function ShopCard({ products, sortValue }: ShopCardProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(product => {
    if (product.key) {
      return product.key.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

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

  const sortedProducts = sortProducts(filteredProducts);

  return (
    <>
      <TextField
        label="search item"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{
          marginBottom: '20px',
          width: '300px',
          '@media (max-width: 426px)': {
            width: '100%',
          },
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          width: '100%',
          '@media (max-width: 767px)': {
            justifyContent: 'center',
          },
        }}
      >
        {sortedProducts && sortedProducts.length > 0 ? (
          sortProducts(sortedProducts).map(product => (
            <Card
              key={product.id}
              sx={{
                width: '300px',
                height: '700px',
                border: '1px solid #ebedf0',
                marginBottom: '40px',
                boxSizing: 'border-box',
                cursor: 'pointer',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                },
                '@media (max-width: 426px)': {
                  width: '100%',
                },
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
                    height: '400px',
                    boxSizing: 'border-box',
                    border: '1px solid #ebedf0',
                    padding: '0',
                    backgroundSize: 'cover',
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      marginBottom: '10px',
                      fontWeight: '500',
                      height: '60px',
                    }}
                  >
                    {product.key}
                  </Typography>
                  <Typography variant="body1" sx={{ height: '80px' }}>
                    {product.description.length > 100
                      ? `${product.description.substring(0, 100)}...`
                      : product.description}
                  </Typography>
                  {!isNaN(product.discount) ? (
                    <Box sx={{ height: '60px' }}>
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
                        {product.discount / 100} EUR - discount
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: '60px' }}>
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
                    sx={{ marginTop: '10px' }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Link>
            </Card>
          ))
        ) : (
          <SkeletonComponent />
        )}
      </Box>
    </>
  );
}
