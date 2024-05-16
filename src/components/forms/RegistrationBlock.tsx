import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, FormControlLabel, Checkbox, Button } from '@mui/material';

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
// import { CustomerData } from 'src/utils/interfaces';

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
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const customer = {};
    console.log(data.get('day'), 'day');
    console.log(customer, 'customer');
    await createCustomer(customer)
      .then(() => {
        navigate('/');
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
          {getTextForm('firstName', statusName, handleName)}
          {/* <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            // onChange={}
          /> */}
        </Grid>
        <Grid item xs={12}>
          {getTextForm('lastName', statusLastName, handleLastName)}
          {/* <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            // onChange={HandleOnInputLastName}
          /> */}
        </Grid>
        <Grid item xs={12}>
          {getTextForm('email', currentStatusEmail, handleOnInputEmail)}
          {/* <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            // onChange={HandleOnInputEmail}
          /> */}
        </Grid>
        <Grid item xs={12}>
          {getTextForm(
            'password',
            currentStatusPassword,
            handleOnInputPassword,
            showPassword,
            getInputProps(handleClickShowPassword, showPassword),
          )}
          {/* <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            // onChange={HandleOnInputPassword}
          /> */}
        </Grid>
        <AgeBlock />
        <AddressBlock />
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label={SERVICE_MESSAGES.defaultAddress}
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {SERVICE_MESSAGES.signIn}
      </Button>
    </Box>
  );
};
