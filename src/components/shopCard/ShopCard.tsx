import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { ShopCardProps } from 'src/utils/interfaces';

export function ShopCard({ products }: ShopCardProps) {
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
        products.map(product => (
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
              <Typography variant="h6" component="h3" p={0}>
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
