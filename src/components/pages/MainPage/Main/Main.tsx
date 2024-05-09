import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './Main.scss';

export default function Main() {
  const [selectedGender, setAlignment] = React.useState('for women');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <main>
      <ChoiceGender selectedGender={selectedGender} handleChange={handleChange} />
      <ShowMainImage selectedGender={selectedGender} />
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