import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { ProductPure, ShopCardProps } from 'src/utils/interfaces';

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
            <CardMedia
              component="div"
              image={product.image}
              sx={{
                width: '100%',
                height: '300px',
                boxSizing: 'border-box',
                border: '1px solid #ebedf0',
                padding: '0',
              }}
            />
            <CardContent>
              <Typography variant="h5" component="h3" p={0}>
                {product.key}
              </Typography>
              <Typography variant="body1">
                {product.description.length > 100
                  ? `${product.description.substring(0, 100)}...`
                  : product.description}
              </Typography>
              <Typography variant="h6">{product.price / 100} USD</Typography>
              <Button variant="outlined">Add to Cart</Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="h6">No products to display.</Typography>
      )}
    </Box>
  );
}
