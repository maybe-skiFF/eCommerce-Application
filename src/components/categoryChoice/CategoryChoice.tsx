import { useState, ChangeEvent, useEffect } from 'react';
import { MouseEvent } from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { CategoryImage } from 'src/components/categoryImage/CategoryImage';
import { apiRoot, getCategories } from 'src/serverPart/ApiRoot';
import { ShopCard } from '../shopCard/ShopCard';
import { SortItem } from 'src/components/sortItem/sortItem';
import { Category, ProductData, ProductPure } from 'src/utils/interfaces';
import { CategoryChoiceSub } from '../categoryChoiceSub/categotyChoiceSub';
import { CreateBreadcrumbs } from '../breadcrumbs/breadcrumbs';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { PaginationComponent } from '../pagination/PaginationComponent';

export function CategoryChoice() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState([]);
  const [isSubCategoryVisible, setIsSubCategoryVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [selectedID, setSelectedID] = useState<string | null>(null);
  const [sortValue, setSortValue] = useState<string>('');
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState(1);

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

  const getProducts = (categoryId: string, offset: number) => {
    return apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: `categories.id:subtree("${categoryId}")`,
          limit: 8,
          offset: offset,
          withTotal: true,
        },
      })
      .execute();
  };

  const createProducts = async (categoryId: string, offset: number) => {
    try {
      const response = await getProducts(categoryId, offset);
      const products = response.body.results;
      let countPage = 0;
      if (response.body.total) {
        countPage = Math.ceil(response.body.total / 8);
      }
      setCountPage(countPage);
      console.log(response);
      return { products };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  async function getProductsByCategory(categoryId: string, offset: number) {
    try {
      const { products } = await createProducts(categoryId, offset);
      const pureProducts = getPureProducts(products as never[]);
      setProducts(pureProducts as never[]);
      return <ShopCard products={pureProducts} sortValue={sortValue} />;
    } catch (error) {
      console.error(error);
    }
  }

  function getPureProducts(products: ProductData[]): ProductPure[] {
    return products.map(product => ({
      id: product.id,
      key: product.key,
      description: product.description['en-US'],
      image: product.masterVariant.images[0].url,
      price: product.masterVariant.prices[0].value.centAmount,
      discount: product.masterVariant.prices[0].discounted?.value?.centAmount,
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
          if (firstCategoryId) {
            setSelectedID(firstCategoryId);
          }
          if (key) {
            const matchingCategory = categories.find(c => c.key === key);
            if (matchingCategory) {
              setSelectedCategory(matchingCategory.key ?? '');
              await getProductsByCategory(matchingCategory.id ?? '', 0);
            } else if (categories[0].key) {
              setSelectedCategory(categories[0].key ?? '');
              await getProductsByCategory(firstCategoryId ?? '', 0);
              navigate(`/${categories[0].key}`);
            }
          } else {
            setSelectedCategory(categories[0].key ?? '');
            await getProductsByCategory(firstCategoryId ?? '', 0);
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
      setPage(1);
      if (newCategory === 'cloth' || newCategory === 'toys') {
        if (event.currentTarget.dataset.id) {
          setSelectedID(event.currentTarget.dataset.id);
        }
        void getProductsByCategory(
          `${event.currentTarget.dataset.id ?? ''}`,
          0,
        );
        navigate(`/for-kids/${newCategory}`);
      } else if (
        newCategory === 'shirts' ||
        newCategory === 'shorts' ||
        newCategory === 'boots'
      ) {
        if (event.currentTarget.dataset.id) {
          setSelectedID(event.currentTarget.dataset.id);
        }
        void getProductsByCategory(
          `${event.currentTarget.dataset.id ?? ''}`,
          0,
        );
        navigate(`/for-men/${newCategory}`);
      } else if (
        newCategory === 'dresses' ||
        newCategory === 'skirts' ||
        newCategory === 'shoes'
      ) {
        if (event.currentTarget.dataset.id) {
          setSelectedID(event.currentTarget.dataset.id);
        }
        void getProductsByCategory(
          `${event.currentTarget.dataset.id ?? ''}`,
          0,
        );
        navigate(`/for-women/${newCategory}`);
      } else {
        void getProductsByCategory(
          `${event.currentTarget.dataset.id ?? ''}`,
          0,
        );
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

  const handleButtonMouseClick = (id: string) => {
    console.log(id);
    setSelectedID(id);
  };

  const handleSortValueChange = (newValue: string) => {
    setSortValue(newValue);
  };

  const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    const offset = (page - 1) * 8;
    if (selectedID) {
      void getProductsByCategory(selectedID, offset);
    }
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
                onClick={() => handleButtonMouseClick(category.id ?? '')}
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
      <PaginationComponent
        count={countPage}
        page={page}
        handlePageChange={handlePageChange}
      />
    </>
  );
}
