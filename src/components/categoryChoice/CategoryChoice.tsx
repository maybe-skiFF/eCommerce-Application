import { useState } from 'react';
import { MouseEvent } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { CategoryImage } from 'src/components/categoryImage/CategoryImage';

export function CategoryChoice() {
  const [selectedCategory, setCategory] = useState<string>('for women');

  const handleChange = (
    _event: MouseEvent<HTMLElement>,
    newCategory: string,
  ) => {
    setCategory(newCategory);
  };

  return (
    <>
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
      <CategoryImage selectedCategory={selectedCategory} />
    </>
  );
}