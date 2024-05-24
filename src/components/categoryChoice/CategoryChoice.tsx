import { useState, useEffect } from 'react';
import { MouseEvent } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { CategoryImage } from 'src/components/categoryImage/CategoryImage';
import { createCategories } from 'src/serverPart/ApiRoot';

const getCategoryKeys = async () => {
  try {
    const response = await createCategories();
    const keys = response.filter(item => item !== undefined).map(item => item!)
      .sort((a, b) => a.localeCompare(b));
    return keys;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export function CategoryChoice() {

  const [selectedCategory, setCategory] = useState<string>('');
  const [categoryKeys, setCategoryKeys] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategoryKeys = async () => {
      try {
        const keys = await getCategoryKeys();
        setCategoryKeys(keys);
        setCategory(keys[0] || '');
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategoryKeys();
  }, []);

  const handleChange = (
    _event: MouseEvent<HTMLElement>,
    newCategory: string | null,
  ) => {
    if (newCategory !== null) {
      setCategory(newCategory);
    }
  };

  return (
    <>
      <ToggleButtonGroup
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
        value={selectedCategory}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        {categoryKeys.map((key) => (
          <ToggleButton
            sx={{
              width: '200px',
            }}
            key={key}
            value={key}>
            {key.toUpperCase()}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <CategoryImage selectedCategory={selectedCategory || ''} />
    </>
  );
}
