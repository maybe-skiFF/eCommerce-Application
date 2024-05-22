import { useState } from 'react';

import { Box, Divider, Grid, SelectChangeEvent } from '@mui/material';

import { addresses } from 'src/constants/dataOfConstants';

import { STYLE_FOR_ADDRESS } from 'src/constants/STYLES';
import { getFormControl } from 'src/utils/createFormControl';
import { checkAddress } from 'src/utils/checkAddress';
import { Address, MyProps } from 'src/utils/interfaces';

export const AddressBlock = (props: MyProps) => {
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');

  const getCountries: string[] = addresses.map(address => address.country);

  const getAddressItems = (country: string): Address =>
    addresses.filter(address => address.country.slice(-2) === `${country}`)[0];

  const handleCountry = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
  };

  const handleCity = (event: SelectChangeEvent) => {
    setCity(event.target.value);
  };

  const handleStreet = (event: SelectChangeEvent) => {
    setStreet(event.target.value);
  };

  const handlePostalCode = (event: SelectChangeEvent) => {
    setPostalCode(event.target.value);
  };

  const handleCheckAddress = () => {
    localStorage.setItem(
      'isAddressCorrect',
      checkAddress(country, city, street, postalCode),
    );
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
      <Divider sx={{ mb: 4 }}>{props.text}</Divider>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'center' }}
        onMouseLeave={handleCheckAddress}
      >
        {getFormControl(
          'country',
          country,
          getCountries,
          STYLE_FOR_ADDRESS,
          props.value ?? '',
          handleCountry,
          handleCheckAddress,
        )}
        {getFormControl(
          'city',
          city,
          getAddressItems(country).city ?? '',
          STYLE_FOR_ADDRESS,
          props.value ?? '',
          handleCity,
          handleCheckAddress,
        )}
        {getFormControl(
          'street',
          street,
          getAddressItems(country).streetName ?? [''],
          STYLE_FOR_ADDRESS,
          props.value ?? '',
          handleStreet,
          handleCheckAddress,
        )}
        {getFormControl(
          'postalCode',
          postalCode,
          getAddressItems(country).postalCode ?? '',
          STYLE_FOR_ADDRESS,
          props.value ?? '',
          handlePostalCode,
          handleCheckAddress,
        )}
      </Grid>
    </Box>
  );
};
