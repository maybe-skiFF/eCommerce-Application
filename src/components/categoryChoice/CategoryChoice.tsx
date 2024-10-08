import { useState, useEffect } from 'react';
import { MouseEvent } from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { CategoryImage } from 'src/components/categoryImage/CategoryImage';
import { getCategories, getProducts } from 'src/serverPart/ApiRoot';
import { ShopCard } from '../shopCard/ShopCard';
import { SortItem } from 'src/components/sortItem/sortItem';
import { Category, ProductData, ProductPure } from 'src/utils/interfaces';
import { CategoryChoiceSub } from '../categoryChoiceSub/categotyChoiceSub';
import { CreateBreadcrumbs } from '../breadcrumbs/breadcrumbs';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export function CategoryChoice() {
  const createCategories = async (): Promise<Category[]> => {
    try {
      const response = await getCategories();
      const categories: Category[] = response.body.results
        .filter(item => !item.parent)
        .map(item => ({
          id: item.id,
          key: item.key,
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
        return product.masterData.current.categories.some(
          category => category.id === categoryId,
        );
      });
      return filteredProducts;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState([]);
  const [isSubCategoryVisible, setIsSubCategoryVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [sortValue, setSortValue] = useState<string>('');

  async function getProductsByCategory(categoryId: string) {
    try {
      const serverProducts = await createProducts(categoryId);
      const products = getPureProducts(serverProducts as never[]);
      setProducts(products as never[]);
      return <ShopCard products={products} sortValue="" />;
    } catch (error) {
      console.error(error);
    }
  }

  function getPureProducts(products: ProductData[]): ProductPure[] {
    return products.map(product => ({
      id: product.id,
      key: product.key,
      description: product.masterData.current.description['en-US'],
      image: product.masterData.current.masterVariant.images[0].url,
      price:
        product.masterData.current.masterVariant.prices[0].value.centAmount,
      discount:
        product.masterData.current.masterVariant.prices[0].discounted?.value
          ?.centAmount,
    }));
  }
  const { key } = useParams();
  useEffect(() => {
    const fetchCategoryKeys = async () => {
      try {
        const categories = await createCategories();
        setCategories(categories);

        if (categories.length > 0) {
          const firstCategoryId = categories[0].id;
          if (key) {
            const matchingCategory = categories.find(c => c.key === key);
            if (matchingCategory) {
              setSelectedCategory(matchingCategory.key ?? '');
              await getProductsByCategory(matchingCategory.id ?? '');
            } else if (categories[0].key) {
              setSelectedCategory(categories[0].key ?? '');
              await getProductsByCategory(firstCategoryId ?? '');
              navigate(`/${categories[0].key}`);
            }
          } else {
            setSelectedCategory(categories[0].key ?? '');
            await getProductsByCategory(firstCategoryId ?? '');
            navigate(`/${categories[0].key}`);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    void fetchCategoryKeys();
  }, []);

  const navigate = useNavigate();
  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newCategory: string | null,
  ) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
      if (newCategory === 'cloth' || newCategory === 'toys') {
        void getProductsByCategory(`${event.currentTarget.dataset.id ?? ''}`);
        navigate(`/for-kids/${newCategory}`);
      } else if (
        newCategory === 'shirts' ||
        newCategory === 'shorts' ||
        newCategory === 'boots'
      ) {
        void getProductsByCategory(`${event.currentTarget.dataset.id ?? ''}`);
        navigate(`/for-men/${newCategory}`);
      } else if (
        newCategory === 'dresses' ||
        newCategory === 'skirts' ||
        newCategory === 'shoes'
      ) {
        void getProductsByCategory(`${event.currentTarget.dataset.id ?? ''}`);
        navigate(`/for-women/${newCategory}`);
      } else {
        void getProductsByCategory(`${event.currentTarget.dataset.id ?? ''}`);
        navigate(`/${newCategory}`);
      }
    }
  };

  const handleMouseEnter = () => {
    setIsSubCategoryVisible(true);
  };

  const handleMouseLeave = () => {
    setIsSubCategoryVisible(false);
  };

  const handleButtonMouseEnter = (key: string) => {
    setSelectedKey(key);
  };

  const handleSortValueChange = (newValue: string) => {
    setSortValue(newValue);
  };

  return (
    <>
      <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <ToggleButtonGroup
          sx={{
            width: '100%',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
          }}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          {categories
            .sort((a, b) => {
              const aKey = a.key ?? '';
              const bKey = b.key ?? '';
              return aKey.localeCompare(bKey);
            })
            .map(category => (
              <ToggleButton
                sx={{
                  width: '200px',
                  height: '50px',
                }}
                key={category.id ?? ''}
                data-id={category.id ?? ''}
                value={category.key ?? ''}
                onMouseEnter={() => handleButtonMouseEnter(category.key ?? '')}
              >
                {category.key?.toUpperCase() ?? ''}
              </ToggleButton>
            ))}
        </ToggleButtonGroup>
        <CategoryChoiceSub
          isVisible={isSubCategoryVisible}
          selectedKey={selectedKey}
          handleChangeProp={handleChange}
        />
      </Box>
      <CategoryImage selectedCategory={selectedCategory ?? ''} />
      <CreateBreadcrumbs selectedCategory={selectedCategory ?? ''} />
      <SortItem onValueChange={handleSortValueChange} />
      <ShopCard products={products} sortValue={sortValue} />
    </>
  );
}
