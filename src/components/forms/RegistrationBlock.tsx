import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';

import { AgeBlock } from './AgeBlock';
import { AddressBlock } from './AddressBlock';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { createCustomer } from 'src/serverPart/ApiRoot';
// import { CustomerData } from 'src/utils/interfaces';

export const RegistrationBlock = () => {
  const navigate = useNavigate();

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
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            // onChange={}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            // onChange={HandleOnInputLastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            // onChange={HandleOnInputEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            // onChange={HandleOnInputPassword}
          />
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
