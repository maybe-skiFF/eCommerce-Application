import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './Main.scss';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

export default function Main() {
  const [selectedGender, setGender] = React.useState('for women');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newGender: string,
  ) => {
    setGender(newGender);
  };

  return (
    <main className="main container">
      <ChoiceGender
        selectedGender={selectedGender}
        handleChange={handleChange}
      />
      <ShowMainImage selectedGender={selectedGender} />
      <ShowShopCard />
    </main>
  );
}

function ChoiceGender({
  selectedGender,
  handleChange,
}: {
  selectedGender: string;
  handleChange: (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => void;
}) {
  return (
    <ToggleButtonGroup
      className="navigation"
      color="primary"
      value={selectedGender}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton className="navigation__item" value="for women">
        FOR WOMEN
      </ToggleButton>
      <ToggleButton className="navigation__item" value="for men">
        FOR MEN
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

function ShowMainImage({ selectedGender }: { selectedGender: string }) {
  return (
    <Box className="navigation__image">
      {selectedGender === 'for men' && (
        <Typography variant="body1" className="navigation__title">
          FOR MEN
        </Typography>
      )}
      {selectedGender === 'for women' && (
        <Typography variant="body1" className="navigation__title">
          FOR WOMEN
        </Typography>
      )}
    </Box>
  );
}

const items = [
  {
    id: '1',
    image: 'image-1',
    title: 'name-1',
    text: 'text-1',
    price: '1',
  },
  {
    id: '2',
    image: 'image-2',
    title: 'name-2',
    text: 'text-2',
    price: '2',
  },
  {
    id: '3',
    image: 'image-3',
    title: 'name-3',
    text: 'text-3',
    price: '3',
  },
  {
    id: '4',
    image: 'image-4',
    title: 'name-4',
    text: 'text-4',
    price: '4',
  },
  {
    id: '5',
    image: 'image-5',
    title: 'name-5',
    text: 'text-5',
    price: '5',
  },
  {
    id: '6',
    image: 'image-6',
    title: 'name-6',
    text: 'text-6',
    price: '6',
  },
];

function ShowShopCard() {
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
