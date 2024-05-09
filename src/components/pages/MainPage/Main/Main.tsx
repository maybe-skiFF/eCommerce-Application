import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './Main.scss';
import { Button } from '@mui/material';

export default function Main() {
  const [selectedGender, setAlignment] = React.useState('for women');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <main className='container'>
      <ChoiceGender selectedGender={selectedGender} handleChange={handleChange} />
      <ShowMainImage selectedGender={selectedGender} />
      <ShowShopCard />
    </main>
  );
}

function ChoiceGender({ selectedGender, handleChange }: {
  selectedGender: string,
  handleChange: (event: React.MouseEvent<HTMLElement>, newAlignment: string) => void
}) {
  return (
    <ToggleButtonGroup
      className='navigation'
      color="primary"
      value={selectedGender}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton className='navigation__item' value="for women">FOR WOMEN</ToggleButton>
      <ToggleButton className='navigation__item' value="for men">FOR MEN</ToggleButton>
    </ToggleButtonGroup>
  );
}

function ShowMainImage({ selectedGender }: { selectedGender: string }) {
  return (
    <div className="navigation__image">
      {selectedGender === 'for men' && <h2 className='navigation__title'>FOR MEN</h2>}
      {selectedGender === 'for women' && <h2 className='navigation__title'>FOR WOMEN</h2>}
    </div>
  );
}

const items = [{
  id: '1',
  image: 'image-1',
  title: 'name-1',
  text: 'text-1',
  price: '1'
},
{
  id: '2',
  image: 'image-2',
  title: 'name-2',
  text: 'text-2',
  price: '2'
},
{
  id: '3',
  image: 'image-3',
  title: 'name-3',
  text: 'text-3',
  price: '3'
},
{
  id: '4',
  image: 'image-4',
  title: 'name-4',
  text: 'text-4',
  price: '4'
}
  ,
{
  id: '5',
  image: 'image-5',
  title: 'name-5',
  text: 'text-5',
  price: '5'
},
{
  id: '6',
  image: 'image-6',
  title: 'name-6',
  text: 'text-6',
  price: '6'
}
]

function ShowShopCard() {
  return (
    <div className="shop__list">
      {items.map((item) => (
        <section className="shop__item" key={item.id}>
          <div className="item__image">{item.image}</div>
          <h3 className="item__title">{item.title}</h3>
          <p className="item__text">{item.text}</p>
          <p className="item__price">{item.price}</p>
          <Button className="item__button" variant="outlined">add to cart</Button>
        </section>
      ))}
    </div>
  );
}