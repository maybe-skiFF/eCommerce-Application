import { FormEvent, useState } from 'react';

import { Box, Divider, Grid } from '@mui/material';

import { addresses } from 'src/constants/dataOfConstans';

import { STYLE_FOR_ADDRESS } from 'src/constants/STYLES';
import { getFormControl } from 'src/utils/createFormControl';
import { Address } from 'src/utils/interfaces';

export const AddressBlock = () => {
  const [country, setCountry] = useState<string>('');
  const getCountryItems: string[] = addresses.map(
    country => country.country[0],
  );
  const handleChange = (event: FormEvent<HTMLFormElement>): void => {
    const data = new FormData(event.currentTarget);
    console.log(data.get('country'), 'country');
    if (data.get('country')) {
      setCountry(data.get('country'));
    }
  };

  const getAddressItems: Address = country
    ? Object.values(addresses).map(address => address.country[0] === country)
    : { country: [''], city: [''], postCode: [''], street: [''] };
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
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'center' }}
        onChange={handleChange}
      >
        {getFormControl('country', getCountryItems, STYLE_FOR_ADDRESS)}
        {getFormControl('city', getAddressItems.city, STYLE_FOR_ADDRESS)}
        {getFormControl('street', getAddressItems.street, STYLE_FOR_ADDRESS)}
        {getFormControl(
          'postCode',
          getAddressItems.postCode,
          STYLE_FOR_ADDRESS,
        )}
      </Grid>
    </Box>
  );
};
