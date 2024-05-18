import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, FormControlLabel, Checkbox } from '@mui/material';

import { getTextForm, getInputProps } from 'src/utils/createFormControl';
import { AgeBlock } from './AgeBlock';
import { AddressBlock } from './AddressBlock';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { createCustomer } from 'src/serverPart/ApiRoot';
import {
  checkValidationFieldPassword,
  checkValidationFieldEmail,
  checkValidationTextField,
} from 'src/utils/checkValidationField';
import { CustomerAddress, CustomerData } from 'src/utils/interfaces';
import { SubmitButton } from './SubmitButton';

export const RegistrationBlock = () => {
  const [statusName, setStatusName] = useState<string>(
    SERVICE_MESSAGES.startCheck,
  );
  const [statusLastName, setStatusLastName] = useState<string>(
    SERVICE_MESSAGES.startCheck,
  );
  const [currentStatusEmail, setCurrentStatusEmail] = useState<string>(
    SERVICE_MESSAGES.startCheck,
  );
  const [currentStatusPassword, setCurrentStatusPassword] = useState<string>(
    SERVICE_MESSAGES.startCheck,
  );
  const [isCurrentAge, setCurrentAge] = useState<string>(
    SERVICE_MESSAGES.startCheck,
  );
  const [isCurrentAddress, setCurrentAddress] = useState<string>(
    SERVICE_MESSAGES.startCheck,
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleName = (event: ChangeEvent<HTMLInputElement>): void => {
    setStatusName(checkValidationTextField(event.target.value));
  };
  const handleLastName = (event: ChangeEvent<HTMLInputElement>): void => {
    setStatusLastName(checkValidationTextField(event.target.value));
  };
  const handleOnInputEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setCurrentStatusEmail(checkValidationFieldEmail(event.target.value));
  };
  const handleOnInputPassword = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setCurrentStatusPassword(checkValidationFieldPassword(event.target.value));
  };
  const handleStatusAge = () => {
    setCurrentAge(
      localStorage.getItem('isAgeEnough') ?? SERVICE_MESSAGES.startCheck,
    );
  };
  const handleStatusAddress = () => {
    setCurrentAddress(
      localStorage.getItem('isAddressCorrect') ?? SERVICE_MESSAGES.startCheck,
    );
  };
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const addressesFormData: CustomerAddress = {
      country: data.get('country') as string,
      city: data.get('city') as string,
      streetName: data.get('street') as string,
      postalCode: data.get('postCode') as string,
    };
    const customer: CustomerData = {
      firstName: data.get('firstName') as string,
      lastName: data.get('lastName') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
      key: data.get('firstName') as string,
      dateOfBirth:
        (data.get('year') as string) +
        '-' +
        (data.get('month') as string) +
        '-' +
        (data.get('day') as string),
      addresses: [addressesFormData],
    };
    console.log(data.get('day'), 'day');
    console.log(customer, 'customer');
    await createCustomer(customer)
      .then(() => {
        navigate('/', { state: { customer } });
      })
      .catch(error => console.log(error));
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={event => void handleSubmit(event)}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {getTextForm('firstName', statusName, handleName, true)}
        </Grid>
        <Grid item xs={12}>
          {getTextForm('lastName', statusLastName, handleLastName, true)}
        </Grid>
        <Grid item xs={12}>
          {getTextForm('email', currentStatusEmail, handleOnInputEmail, true)}
        </Grid>
        <Grid item xs={12}>
          {getTextForm(
            'password',
            currentStatusPassword,
            handleOnInputPassword,
            showPassword,
            getInputProps(handleClickShowPassword, showPassword),
          )}
        </Grid>
        <Grid item xs={6} onMouseLeave={handleStatusAge}>
          <AgeBlock />
        </Grid>
        <Grid item xs={6} onMouseLeave={handleStatusAddress}>
          <AddressBlock />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label={SERVICE_MESSAGES.defaultAddress}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label={SERVICE_MESSAGES.billingAddress}
          />
        </Grid>
      </Grid>

      {SubmitButton(
        [
          statusName,
          statusLastName,
          currentStatusEmail,
          currentStatusPassword,
          isCurrentAge,
          isCurrentAddress,
        ],
        SERVICE_MESSAGES.signIn,
      )}
    </Box>
  );
};
