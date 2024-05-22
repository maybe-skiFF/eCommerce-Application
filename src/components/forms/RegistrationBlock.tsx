import { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { createCustomer } from 'src/serverPart/ApiRoot';
import { getAddressesArray } from 'src/utils/getAddressesArray';
import {
  checkValidationFieldPassword,
  checkValidationFieldEmail,
  checkValidationTextField,
} from 'src/utils/checkValidationField';
import { CustomerData } from 'src/utils/interfaces';
import { SubmitButton } from './SubmitButton';
import { SimpleSnackbar } from './Snackbar';
import { ErrorObject } from '@commercetools/platform-sdk';
import { useIsAuth } from 'src/context/context';

export const RegistrationBlock = () => {
  const [formData, setFormData] = useState({
    statusName: SERVICE_MESSAGES.startCheck,
    statusLastName: SERVICE_MESSAGES.startCheck,
    currentStatusEmail: SERVICE_MESSAGES.startCheck,
    currentStatusPassword: SERVICE_MESSAGES.startCheck,
  });

  const [isCurrentAge, setIsCurrentAge] = useState<string>(
    SERVICE_MESSAGES.startCheck,
  );
  const [isCurrentAddress, setIsCurrentAddress] = useState<string>(
    SERVICE_MESSAGES.startCheck,
  );
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

  const handleName = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      statusName: checkValidationTextField(event.target.value),
    });
  };

  const handleLastName = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      statusLastName: checkValidationTextField(event.target.value),
    });
  };

  const handleOnInputEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      currentStatusEmail: checkValidationFieldEmail(event.target.value),
    });
  };

  const handleOnInputPassword = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setFormData({
      ...formData,
      currentStatusPassword: checkValidationFieldPassword(event.target.value),
    });
  };

  const handleStatusAge = () => {
    setIsCurrentAge(
      localStorage.getItem('isAgeEnough') ?? SERVICE_MESSAGES.startCheck,
    );
  };
  const handleStatusAddress = () => {
    setIsCurrentAddress(
      localStorage.getItem('isAddressCorrect') ?? SERVICE_MESSAGES.startCheck,
    );
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
    const customer: CustomerData = {
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
    getAddressesArray(kindOfAddresses, customer.addresses, data);
    await createCustomer(customer)
      .then(() => {
        navigate('/');
        setIsAuth(true);
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
          {getTextForm('firstName', formData.statusName, handleName, true)}
        </Grid>
        <Grid item xs={15} md={5} sm={6} lg={6}>
          {getTextForm(
            'lastName',
            formData.statusLastName,
            handleLastName,
            true,
          )}
        </Grid>
        <Grid item xs={15} md={5} sm={6} lg={6}>
          {getTextForm(
            'email',
            formData.currentStatusEmail,
            handleOnInputEmail,
            true,
          )}
        </Grid>
        <Grid item xs={15} md={5} sm={6} lg={6}>
          {getTextForm(
            'password',
            formData.currentStatusPassword,
            handleOnInputPassword,
            showPassword,
            getInputProps(handleClickShowPassword, showPassword),
          )}
        </Grid>
        <Grid item xs={12} md={5.5} sm={12} onMouseLeave={handleStatusAge}>
          <AgeBlock />
        </Grid>
        <Grid item xs={12} md={5.5} sm={12} onMouseLeave={handleStatusAddress}>
          <AddressBlock text={SERVICE_MESSAGES.address} value={'default'} />
        </Grid>
        <Grid item xs={9} md={5.5} sm={12} ml={'8%'} mr={'8%'} mt={1}>
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
        <Grid item xs={12} md={5.5} sm={12} onMouseLeave={handleStatusAge}>
          <Collapse in={openDefaultAddress} timeout="auto" unmountOnExit>
            <AddressBlock
              text={SERVICE_MESSAGES.addressShipping}
              value={'shipping'}
            />
          </Collapse>
        </Grid>
      </Grid>

      {SubmitButton(
        [
          formData.statusName,
          formData.statusLastName,
          formData.currentStatusEmail,
          formData.currentStatusPassword,
          isCurrentAge,
          isCurrentAddress,
        ],
        SERVICE_MESSAGES.authorization,
      )}
    </Box>
  );
};
