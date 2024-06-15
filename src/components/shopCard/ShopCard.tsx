import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Link,
  CircularProgress,
} from '@mui/material';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { ProductPure, ShopCardProps } from 'src/utils/interfaces';
import {
  useState,
  useEffect,
  ChangeEvent,
  MouseEvent,
  SyntheticEvent,
} from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { PaginationComponent } from '../pagination/PaginationComponent';
import { SkeletonComponent } from '../skeleton/skeletonComponent';
import { SimpleSnackbar } from '../SimpleSnackbar/SimpleSnackbar';
import { useCart } from 'src/context/context';
import { Cart, ClientResponse, ErrorObject } from '@commercetools/platform-sdk';
import {
  addProductToCartByID,
  getAnonymnusCart,
  getCartByID,
  removeProductToCartByID,
  setCountryForCart,
} from 'src/serverPart/BuildCart';
import { getCookie, setCookie } from 'src/utils/cookieWork';

export function ShopCard({ products, sortValue }: ShopCardProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [open, setOpen] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const { cart, setCart } = useCart();

  const itemsPerPage = 8;
  useEffect(() => {
    setPage(1);
  }, [products]);

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return event;
    }
    setOpen('');
  };

  const getMyAnonimnusCart = async (): Promise<ClientResponse<Cart>> => {
    if (!getCookie('myCart')) {
      const cartAnon = await getAnonymnusCart();
      setCookie('myCart', cartAnon.body.id);
      const cartFromServer = await setCountryForCart(
        cartAnon.body.id,
        cartAnon.body.version,
        'US',
      ).then(data => {
        console.log(data, 'cartAnan');
        setCart({ ...cart, ...data.body });
        return data;
      });
      return cartFromServer;
    }
    return await getCartByID(getCookie('myCart') ?? '').then(data => {
      setCart({ ...cart, ...data.body });
      return data;
    });
  };

  const handleClickForAddToCart = async (
    event: MouseEvent<HTMLButtonElement>,
    productID: string,
  ) => {
    event.preventDefault();
    setIsLoading(true);
    const cartFromServer = await getMyAnonimnusCart();
    await addProductToCartByID(
      cartFromServer.body.id,
      cartFromServer.body.version,
      productID,
    )
      .then(({ body }) => {
        setCart({ ...cart, ...body });
        setOpen(SERVICE_MESSAGES.added);
        setIsLoading(false);
      })
      .catch((error: ErrorObject) => setOpen(error.message));
  };

  const handleClickForDelete = async (
    event: MouseEvent<HTMLButtonElement>,
    productID: string,
  ) => {
    event.preventDefault();
    setIsLoading(true);
    const productInCart = cart.lineItems.filter(
      line => productID === line.productId,
    );
    if (productInCart.length > 0) {
      await removeProductToCartByID(
        cart.id,
        cart.version,
        productInCart[0].id,
        productInCart[0].quantity,
      )
        .then(({ body }) => {
          setCart({ ...cart, ...body });
          setOpen(SERVICE_MESSAGES.deleted);
          setIsLoading(false);
        })
        .catch((error: ErrorObject) => setOpen(error.message));
    }
  };

  const isExistToCart = (id: string): boolean => {
    return cart.lineItems.some(line => line.productId === id);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const filteredProducts = products.filter(product => {
    if (product.key) {
      return product.key.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  function sortProductsByKeyAscending(products: ProductPure[]) {
    return products.sort((a, b) => {
      const keyA = (a.key ?? '').toLowerCase();
      const keyB = (b.key ?? '').toLowerCase();

      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  }

  function sortProductsByKeyDescending(products: ProductPure[]) {
    return products.sort((a, b) => {
      const keyA = (a.key ?? '').toLowerCase();
      const keyB = (b.key ?? '').toLowerCase();

      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });
  }

  function sortProductsByPriceAscending(products: ProductPure[]) {
    return products.sort((a, b) => {
      const keyA = a.price;
      const keyB = b.price;

      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  }

  function sortProductsByPriceDescending(products: ProductPure[]) {
    return products.sort((a, b) => {
      const keyA = a.price;
      const keyB = b.price;

      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });
  }

  const sortProducts = (products: ProductPure[]) => {
    switch (sortValue) {
      case SERVICE_MESSAGES.sortCategory_1:
        return sortProductsByKeyAscending(products);
      case SERVICE_MESSAGES.sortCategory_2:
        return sortProductsByKeyDescending(products);
      case SERVICE_MESSAGES.sortCategory_3:
        return sortProductsByPriceAscending(products);
      case SERVICE_MESSAGES.sortCategory_4:
        return sortProductsByPriceDescending(products);
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(filteredProducts);

  const paginatedProducts = sortedProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );
  const count = Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <>
      <TextField
        label="search item"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{
          marginBottom: '20px',
          width: '300px',
          '@media (max-width: 426px)': {
            width: '100%',
          },
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          width: '100%',
          '@media (max-width: 767px)': {
            justifyContent: 'center',
          },
        }}
      >
        {paginatedProducts && paginatedProducts.length > 0 ? (
          sortProducts(paginatedProducts).map(product => (
            <Card
              key={product.id}
              sx={{
                width: '300px',
                height: '700px',
                border: '1px solid #ebedf0',
                marginBottom: '40px',
                boxSizing: 'border-box',
                cursor: 'pointer',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                },
                '@media (max-width: 426px)': {
                  width: '100%',
                },
              }}
            >
              <Link
                component={ReactLink}
                to={`/catalog/${product.id}`}
                color={'inherit'}
                underline="none"
              >
                <CardMedia
                  component="div"
                  image={product.image}
                  sx={{
                    width: '100%',
                    height: '400px',
                    boxSizing: 'border-box',
                    border: '1px solid #ebedf0',
                    padding: '0',
                    backgroundSize: 'cover',
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      marginBottom: '10px',
                      fontWeight: '500',
                      height: '60px',
                    }}
                  >
                    {product.key}
                  </Typography>
                  <Typography variant="body1" sx={{ height: '80px' }}>
                    {product.description.length > 100
                      ? `${product.description.substring(0, 100)}...`
                      : product.description}
                  </Typography>
                  {!isNaN(product.discount) ? (
                    <Box sx={{ height: '60px' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          textDecoration: 'line-through',
                          color: 'text.secondary',
                        }}
                      >
                        {product.price / 100} EUR
                      </Typography>
                      <Typography
                        sx={{ color: 'red', fontWeight: '700' }}
                        variant="h6"
                      >
                        {product.discount / 100} EUR - discount
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: '60px' }}>
                      <Typography variant="h6">
                        {product.price / 100} EUR
                      </Typography>
                    </Box>
                  )}
                  <Button
                    variant="outlined"
                    sx={{
                      marginTop: '10px',
                      padding: '3%',
                      width: '80%',
                      fontSize: '85%',
                    }}
                    onClick={
                      isExistToCart(product.id)
                        ? event => void handleClickForDelete(event, product.id)
                        : event =>
                            void handleClickForAddToCart(event, product.id)
                    }
                  >
                    {isExistToCart(product.id)
                      ? SERVICE_MESSAGES.deleteFromCart
                      : SERVICE_MESSAGES.addToCart}
                  </Button>
                </CardContent>
              </Link>
            </Card>
          ))
        ) : (
          <SkeletonComponent />
        )}
        {SimpleSnackbar(open, open !== '', handleClose)}
      </Box>
      {isLoading ? (
        <CircularProgress
          style={{ position: 'absolute', zIndex: 2, top: '50%', left: '50%' }}
        />
      ) : (
        ''
      )}
      <PaginationComponent
        count={count}
        page={page}
        handlePageChange={handlePageChange}
      />
    </>
  );
}
