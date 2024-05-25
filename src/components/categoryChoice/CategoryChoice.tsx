import { useState, useEffect } from 'react';
import { MouseEvent } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { CategoryImage } from 'src/components/categoryImage/CategoryImage';
import { createCategories } from 'src/serverPart/ApiRoot';

export interface Category {
  id: string | undefined;
  key: string | undefined;
}

export function CategoryChoice() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategoryKeys = async () => {
      try {
        const categories = await createCategories();
        setCategories(categories);
        setSelectedCategory(categories[0].key || null);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategoryKeys();
  }, []);

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newCategory: string | null,
  ) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
      console.log(`${event.currentTarget.dataset.id || ''}`);
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
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        {categories.sort((a, b) => {
          const aKey = a.key || '';
          const bKey = b.key || '';
          return aKey.localeCompare(bKey);
        }).map(category => (
          <ToggleButton
            sx={{
              width: '200px',
            }}
            key={category.id || ''}
            data-id={category.id || ''}
            value={category.key || ''}>
            {category.key?.toUpperCase() || ''}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <CategoryImage
        selectedCategory={selectedCategory || ''}
      />
    </>
  );
}