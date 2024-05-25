import { useState, useEffect } from 'react';
import { MouseEvent } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { CategoryImage } from 'src/components/categoryImage/CategoryImage';
import { getCategories, getProducts } from 'src/serverPart/ApiRoot';

export interface Category {
  id: string | undefined;
  key: string | undefined;
}

export function CategoryChoice() {

  interface Category {
    id: string;
    key: string | undefined;
  }
  const createCategories = async (): Promise<Category[]> => {
    try {
      const response = await getCategories();
      const categories: Category[] = response.body.results
        .filter(item => !item.parent)
        .map(item => ({
          id: item.id,
          key: item.key
        }));
      return categories;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createProducts = async (categoryId: string) => {
    try {
      const response = await getProducts();
      const products = response.body.results;

      const filteredProducts = products.filter(product => {
        return product.masterData.current.categories.some(category => category.id === categoryId);
      });
      return filteredProducts;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  async function getProductsByCategory(categoryId: string) {
    try {
      const products = await createProducts(categoryId);
      console.log(products);
      return products;
    } catch (error) {
      console.error(error);
    }
  }

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategoryKeys = async () => {
      try {
        const categories = await createCategories();
        setCategories(categories);
        setSelectedCategory(categories[0].key || null);
        getProductsByCategory(categories[0].id);
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
      getProductsByCategory(`${event.currentTarget.dataset.id || ''}`);
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