import { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useCustomer, useIsAuth } from 'src/context/context';
import {
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
  Typography,
  Collapse,
} from '@mui/material';

import { getTextForm, getInputProps } from 'src/utils/createFormControl';
import { AgeBlock } from './AgeBlock';
import { AddressBlock } from './AddressBlock';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import {
  createCustomer,
  getApiWithCredentials,
  getMyCustomer,
} from 'src/serverPart/ApiRoot';
import {
  checkValidationFieldPassword,
  checkValidationFieldEmail,
  checkValidationTextField,
} from 'src/utils/checkValidationField';
import { CustomerData } from 'src/utils/interfaces';
import { SubmitButton } from '../SubmitButton/SubmitButton';
import { SimpleSnackbar } from '../SimpleSnackbar/SimpleSnackbar';
import {
  ClientResponse,
  CustomerSignInResult,
  ErrorObject,
} from '@commercetools/platform-sdk';
import { checkFullData } from 'src/utils/CheckFullData';
import { getAddressesArray } from 'src/utils/getAddressesArray';
import { getCookie, setCookie } from 'src/utils/cookieWork';
import {
  createCustomerCart,
  setCustomerToCart,
} from 'src/serverPart/BuildCart';

export const RegistrationBlock = () => {
  const [formData, setFormData] = useState<string>(SERVICE_MESSAGES.startCheck);

  const { customer, setCustomer } = useCustomer();
  const { cart, setCart } = useCart();

  const [openDefaultAddress, setOpenDefaultAddress] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  const [serverMessage, setServerMessage] = useState<string>('');

  const navigate = useNavigate();

  const { setIsAuth } = useIsAuth();

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return event;
    }
    setOpen(false);
  };
  const handleCheckedDefaultAddress = () => {
    setOpenDefaultAddress(!openDefaultAddress);
  };

  const handleChange = (nameField: string, property: string): void => {
    let funcCheck = checkValidationTextField(property);
    if (nameField === 'password') {
      funcCheck = checkValidationFieldPassword(property);
    } else if (nameField === 'email') {
      funcCheck = checkValidationFieldEmail(property);
    }
    funcCheck === SERVICE_MESSAGES.checkDone
      ? setCustomer({ ...customer, [nameField]: property })
      : setCustomer({ ...customer, [nameField]: funcCheck });
    checkFullData(customer)
      ? setFormData(SERVICE_MESSAGES.checkDone)
      : setFormData(SERVICE_MESSAGES.startCheck);
  };

  const doRewriteFormData = () => {
    checkFullData(customer)
      ? setFormData(SERVICE_MESSAGES.checkDone)
      : setFormData(SERVICE_MESSAGES.startCheck);
  };

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const kindOfAddresses = ['default'];
    if (openDefaultAddress) {
      kindOfAddresses.push('shipping');
    }
    const myCustomer: CustomerData = {
      firstName: data.get('firstName') as string,
      lastName: data.get('lastName') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
      key: new Date().valueOf() + '',
      dateOfBirth:
        (data.get('year ') as string) +
        '-' +
        (data.get('month ') as string) +
        '-' +
        (data.get('day ') as string),
      addresses: [],
    };
    getAddressesArray(kindOfAddresses, myCustomer.addresses, data);

    const myApi = getApiWithCredentials(
      data.get('email') as string,
      data.get('password') as string,
    );
    await createCustomer(myCustomer)
      .then(data => {
        if (data.statusCode === 201) {
          navigate('/');
          localStorage.setItem('isAuth', 'true');
          setIsAuth(true);
        }
      })
      .then(async () => {
        await getMyCustomer(
          myApi,
          data.get('email') as string,
          data.get('password') as string,
        ).then(async ({ body }: ClientResponse<CustomerSignInResult>) => {
          setCookie('myID', body.customer.id);
          const oldCart = await createCustomerCart(myApi, 'US');
          console.log(oldCart, 'oldCart');
          getCookie('myCart')
            ? getCookie('myCart')
            : oldCart
              ? oldCart.body.id
              : '';
          const customer = await setCustomerToCart(
            oldCart.body,
            body.customer.id,
          )
            .then(newCart => {
              const newCartData = newCart.body;
              setCart({ ...cart, ...newCartData });
              return newCart;
            })
            .catch((error: ErrorObject) => console.log(error.message));
          if (customer) setCookie('myCart', customer.body.id ?? '');
        });
      })
      .catch((error: ErrorObject) => {
        setServerMessage(error.message);
        setOpen(true);
      });
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={event => void handleSubmit(event)}
      sx={{
        paddingLeft: '0',
        paddingRight: '0',
        maxWidth: '1100px',
        width: '90%',
        mt: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {SimpleSnackbar(serverMessage, open, handleClose)}
      <Grid
        container
        spacing={2}
        sx={{ margin: '0 auto', justifyContent: 'space-between' }}
      >
        <Grid item xs={15} md={5} sm={6} lg={6}>
          {getTextForm(
            'firstName',
            customer.firstName,
            (event: ChangeEvent<HTMLInputElement>) => {
              handleChange('firstName', event.target.value);
            },
            true,
          )}
        </Grid>
        <Grid item xs={15} md={5} sm={6} lg={6}>
          {getTextForm(
            'lastName',
            customer.lastName,
            (event: ChangeEvent<HTMLInputElement>) => {
              handleChange('lastName', event.target.value);
            },
            true,
          )}
        </Grid>
        <Grid item xs={15} md={5} sm={6} lg={6}>
          {getTextForm(
            'email',
            customer.email,
            (event: ChangeEvent<HTMLInputElement>) => {
              handleChange('email', event.target.value);
            },
            true,
          )}
        </Grid>
        <Grid item xs={15} md={5} sm={6} lg={6}>
          {getTextForm(
            'password',
            customer.password,
            (event: ChangeEvent<HTMLInputElement>) => {
              handleChange('password', event.target.value);
            },
            showPassword,
            getInputProps(handleClickShowPassword, showPassword),
          )}
        </Grid>
        <Grid item xs={12} md={5.5} sm={12} onMouseOver={doRewriteFormData}>
          <AgeBlock />
        </Grid>
        <Grid item xs={12} md={5.5} sm={12} onMouseOver={doRewriteFormData}>
          <AddressBlock text={SERVICE_MESSAGES.address} value={'default'} />
        </Grid>
        <Grid
          item
          xs={9}
          md={5.5}
          sm={12}
          ml={'8%'}
          mr={'8%'}
          mt={1}
          onMouseOver={doRewriteFormData}
        >
          <FormControlLabel
            control={
              <Checkbox
                value="allowExtraEmails"
                color="primary"
                size="small"
                defaultChecked
                onChange={handleCheckedDefaultAddress}
              />
            }
            label={
              <Typography fontSize={'75%'}>
                {SERVICE_MESSAGES.defaultAddress}
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12} md={5.5} sm={12}>
          <Collapse in={openDefaultAddress} timeout="auto" unmountOnExit>
            <AddressBlock
              text={SERVICE_MESSAGES.addressShipping}
              value={'shipping'}
            />
          </Collapse>
        </Grid>
      </Grid>
      {SubmitButton([formData], SERVICE_MESSAGES.authorization)}
    </Box>
  );
};
