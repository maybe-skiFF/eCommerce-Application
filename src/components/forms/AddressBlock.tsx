import { useState } from 'react';

import { Box, Divider, Grid, SelectChangeEvent } from '@mui/material';

import { addresses } from 'src/constants/dataOfConstans';

import { STYLE_FOR_ADDRESS } from 'src/constants/STYLES';
import { getFormControl } from 'src/utils/createFormControl';
import { Address } from 'src/utils/interfaces';

export const AddressBlock = () => {
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [postCode, setPostCode] = useState<string>('');
  const getCountries: string[] = addresses.map(address => address.country);
  const getAddressItems = (country: string): Address =>
    addresses.filter(address => address.country.slice(-2) === `${country}`)[0];
  const handleCountry = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
    console.log(addresses[1].country.slice(-3));
    console.log(getAddressItems(event.target.value));
    console.log(event.target.value, 'country');
  };
  const handleCity = (event: SelectChangeEvent) => {
    setCity(event.target.value);
    console.log(city, 'city');
  };
  const handleStreet = (event: SelectChangeEvent) => {
    setStreet(event.target.value);
    console.log(street, 'street');
  };
  const handlePostCode = (event: SelectChangeEvent) => {
    setPostCode(event.target.value);
    console.log(postCode, 'post');
  };

  return (
    <Box
      sx={{
        mt: 3,
        mb: 3,
        mr: 'auto',
        ml: 'auto',
        minWidth: 120,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Divider sx={{ ml: 'auto', mr: 'auto', mb: 2 }}>Address</Divider>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        {getFormControl(
          'country',
          country,
          getCountries,
          STYLE_FOR_ADDRESS,
          handleCountry,
        )}
        {getFormControl(
          'city',
          city,
          getAddressItems(country).city ?? '',
          STYLE_FOR_ADDRESS,
          handleCity,
        )}
        {getFormControl(
          'street',
          street,
          getAddressItems(country).streetName ?? [''],
          STYLE_FOR_ADDRESS,
          handleStreet,
        )}
        {getFormControl(
          'postCode',
          postCode,
          getAddressItems(country).postalCode ?? '',
          STYLE_FOR_ADDRESS,
          handlePostCode,
        )}
      </Grid>
    </Box>
  );
};
