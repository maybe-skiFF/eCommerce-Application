import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { items } from 'src/server-data/shop-data';

export function ShopCard() {
  return (
    <Box className="shop__list">
      {items.map(item => (
        <Card className="shop__item" key={item.id}>
          <CardMedia
            component="div"
            className="item__image"
            image={item.image}
          />
          <CardContent>
            <Typography variant="h6" component="h3" className="item__title">
              {item.title}
            </Typography>
            <Typography variant="body1" className="item__text">
              {item.text}
            </Typography>
            <Typography variant="h6" className="item__price">
              {item.price}
            </Typography>
            <Button variant="outlined" className="item__button">
              add to cart
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
