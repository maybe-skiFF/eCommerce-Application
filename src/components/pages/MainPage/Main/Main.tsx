import { useState, MouseEvent } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  Select,
  SelectChangeEvent,
  InputLabel,
  MenuItem,
} from '@mui/material';
import { items } from 'src/server-data/shop-data';
import './Main.scss';

export function Main() {
  const [selectedCategory, setCategory] = useState('for women');

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newCategory: string,
  ) => {
    setCategory(newCategory);
  };

  return (
    <main className="main container">
      <ChoiceCategory
        selectedCategory={selectedCategory}
        handleChange={handleChange}
      />
      <ShowMainImage selectedCategory={selectedCategory} />
      <SortItem />
      <ShowShopCard />
    </main>
  );
}

function SortItem() {
  const [value, setValue] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <Box className="sort" sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">sort items</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="sort items"
          onChange={handleChange}
        >
          <MenuItem value={'name'}>name</MenuItem>
          <MenuItem value={'cost'}>cost</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function ChoiceCategory({
  selectedCategory,
  handleChange,
}: {
  selectedCategory: string;
  handleChange: (event: MouseEvent<HTMLElement>, newAlignment: string) => void;
}) {
  return (
    <ToggleButtonGroup
      className="navigation"
      value={selectedCategory}
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

function ShowMainImage({ selectedCategory }: { selectedCategory: string }) {
  return (
    <Box className="navigation__image">
      {selectedCategory === 'for men' && (
        <Typography variant="body1" className="navigation__title">
          FOR MEN
        </Typography>
      )}
      {selectedCategory === 'for women' && (
        <Typography variant="body1" className="navigation__title">
          FOR WOMEN
        </Typography>
      )}
    </Box>
  );
}

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
