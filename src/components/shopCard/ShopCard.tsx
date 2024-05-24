import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { items } from 'src/server-data/shop-data';

export function ShopCard() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
      }}>
      {
        items.map(item => (
          <Card
            sx={{
              width: '30%',
              height: '600px',
              border: '1px solid #ebedf0',
              marginBottom: '40px',
              boxSizing: 'border-box',
              cursor: 'pointer',
            }}
            key={item.id}>
            <CardMedia
              component="div"
              image={item.image}
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
                {item.title}
              </Typography>
              <Typography variant="body1" className="item__text">
                {item.text}
              </Typography>
              <Typography variant="h6" className="item__price">
                {item.price}
              </Typography>
              <Button variant="outlined" className="item__button">
                {SERVICE_MESSAGES.addToCart}
              </Button>
            </CardContent>
          </Card>
        ))
      }
    </Box >
  );
}
