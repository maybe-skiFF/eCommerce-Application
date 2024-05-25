import { useState, useEffect } from 'react';
import { MouseEvent } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { CategoryImage } from 'src/components/categoryImage/CategoryImage';
import { getCategories, getProducts } from 'src/serverPart/ApiRoot';
import { ShopCard } from '../shopCard/ShopCard';
import { SortItem } from 'src/components/sortItem/sortItem';

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

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  async function getProductsByCategory(categoryId: string) {
    try {
      const serverProducts = await createProducts(categoryId);
      const products = getPureProducts(serverProducts);
      setProducts(products);
      ShopCard(products);
      console.log(serverProducts);
      console.log(products)
    } catch (error) {
      console.error(error);
    }
  }

  function getPureProducts(products: Product[]): PureProduct[] {
    return products.map(product => ({
      id: product.id,
      key: product.key,
      description: product.masterData.current.description['en-US'],
      image: product.masterData.current.masterVariant.images[0]['url'],
      price: product.masterData.current.masterVariant.prices[0].value.centAmount,
    }));
  }

  useEffect(() => {
    const fetchCategoryKeys = async () => {
      try {
        const categories = await createCategories();
        setCategories(categories);

        if (categories.length > 0) {
          const firstCategoryId = categories[0].id;
          setSelectedCategory(categories[0].key || null);
          await getProductsByCategory(firstCategoryId);
          ShopCard(products);
        }
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
  }

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
      <SortItem />
      <ShopCard products={products} />
    </>
  );
}