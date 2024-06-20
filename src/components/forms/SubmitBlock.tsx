import {
  ReactNode,
  ChangeEvent,
  FormEvent,
  useState,
  SyntheticEvent,
} from 'react';
import { Box } from '@mui/material';

import { getMyCustomer, getApiWithCredentials } from 'src/serverPart/ApiRoot';
import { getTextForm, getInputProps } from 'src/utils/createFormControl';
import { SubmitButton } from '../SubmitButton/SubmitButton';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import {
  checkValidationFieldEmail,
  checkValidationFieldPassword,
} from 'src/utils/checkValidationField';
import { getCookie, setCookie } from 'src/utils/cookieWork';
import { useNavigate } from 'react-router-dom';
import { useCart, useIsAuth } from 'src/context/context';
import { SimpleSnackbar } from '../SimpleSnackbar/SimpleSnackbar';
import {
  ClientResponse,
  CustomerSignInResult,
  ErrorObject,
} from '@commercetools/platform-sdk';
import { getMergeCart } from 'src/serverPart/BuildCart';

export const SubmitBlock = (): ReactNode => {
  const [currentStatusEmail, setCurrentStatusEmail] = useState<string>(
    SERVICE_MESSAGES.startCheck,
  );
  const [currentStatusPassword, setCurrentStatusPassword] = useState<string>(
    SERVICE_MESSAGES.startCheck,
  );
  const [serverMessage, setServerMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { setIsAuth } = useIsAuth();
  const { cart, setCart } = useCart();

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return event;
    }
    setOpen(false);
  };

  const handleOnInputEmailPassword = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    if (event.target.name === 'email') {
      setCurrentStatusEmail(checkValidationFieldEmail(event.target.value));
    }
    if (event.target.name === 'password') {
      setCurrentStatusPassword(
        checkValidationFieldPassword(event.target.value),
      );
    }
  };

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('email') === '') {
      setCurrentStatusEmail(SERVICE_MESSAGES.notEmpty);
    }
    if (data.get('password') === '') {
      setCurrentStatusPassword(SERVICE_MESSAGES.notEmpty);
    }
    const myApi = getApiWithCredentials(
      data.get('email') as string,
      data.get('password') as string,
    );

    await getMyCustomer(
      myApi,
      data.get('email') as string,
      data.get('password') as string,
    )
      .then(
        async ({ body, statusCode }: ClientResponse<CustomerSignInResult>) => {
          if (statusCode !== 200) {
            setOpen(true);
            setServerMessage(SERVICE_MESSAGES.errorMail);
          } else {
            navigate('/');
            localStorage.setItem('isAuth', 'true');
            setIsAuth(true);
            setCookie('myID', body.customer.id);
            const oldCart = body.cart;
            const cartId = getCookie('myCart')
              ? getCookie('myCart')
              : oldCart
                ? oldCart.id
                : '';
            if (getCookie('myCart')) {
              await getMergeCart(
                myApi,
                data.get('email') as string,
                data.get('password') as string,
                cartId ?? '',
              ).then(newCart => {
                const newCartData = newCart.body.cart;
                setCart({ ...cart, ...newCartData });
                setCookie('myCart', newCartData!.id);
                return newCart;
              });
            } else {
              setCookie('myCart', oldCart!.id);
              setCart({ ...cart, ...oldCart });
            }
            //   const customer = await getMergeCart(
            //     myApi,
            //     data.get('email') as string,
            //     data.get('password') as string,
            //     cartId ?? '',
            //   ).then(newCart => {
            //     const newCartData = newCart.body.cart;
            //     setCart({ ...cart, ...newCartData });
            //     setCookie('myCart', newCartData!.id);
            //     return newCart;
            //   });
            //   if (customer.body.cart)
            //     setCookie('myCart', customer.body.cart.id ?? '');
          }
        },
      )
      .catch((error: ErrorObject) => {
        setServerMessage(error.message);
        setOpen(true);
      });
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 1 }}
      onSubmit={event => void handleSubmit(event)}
    >
      {SimpleSnackbar(serverMessage, open, handleClose)}
      {getTextForm(
        'email',
        currentStatusEmail,
        handleOnInputEmailPassword,
        true,
      )}
      {getTextForm(
        'password',
        currentStatusPassword,
        handleOnInputEmailPassword,
        showPassword,
        getInputProps(handleClickShowPassword, showPassword),
      )}
      {SubmitButton(
        [currentStatusEmail, currentStatusPassword],
        SERVICE_MESSAGES.signIn,
      )}
    </Box>
  );
};
