import { useState } from 'react';
import { useCustomer } from 'src/context/context';

import { Box, Divider, Grid, SelectChangeEvent } from '@mui/material';

import { listOfAddresses } from 'src/constants/dataOfConstants';

import { STYLE_FOR_ADDRESS } from 'src/constants/STYLES';
import { getFormControl } from 'src/utils/createFormControl';
import { Address, AddressProps } from 'src/utils/interfaces';
import { checkFullData } from 'src/utils/CheckFullData';

export const AddressBlock = (props: AddressProps) => {
  const [dateParts, setDateParts] = useState({
    country: '',
    city: '',
    streetName: '',
    postalCode: '',
  });

  const { customer } = useCustomer();
  const getCountries: string[] = listOfAddresses.map(
    address => address.country,
  );

  const getAddressItems = (country: string): Address =>
    listOfAddresses.filter(
      address => address.country.slice(-2) === `${country}`,
    )[0];

  const handleDateChange = (part: keyof typeof dateParts, value: string) => {
    setDateParts(prevState => ({
      ...prevState,
      [part]: value,
    }));
    checkFullData(dateParts) ? customer.addresses.push(dateParts) : null;
  };

  const doRewriteCustomer = () => {
    if (checkFullData(dateParts)) {
      customer.addresses.push(dateParts);
      console.log(customer);
    }
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
      onMouseLeave={doRewriteCustomer}
    >
      <Divider sx={{ mb: 4 }}>{props.text}</Divider>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        {getFormControl(
          'country',
          dateParts.country,
          getCountries,
          STYLE_FOR_ADDRESS,
          props.value ?? '',
          (event: SelectChangeEvent) =>
            handleDateChange('country', event.target.value),
        )}
        {getFormControl(
          'city',
          dateParts.city,
          getAddressItems(dateParts.country).city ?? '',
          STYLE_FOR_ADDRESS,
          props.value ?? '',
          (event: SelectChangeEvent) =>
            handleDateChange('city', event.target.value),
        )}
        {getFormControl(
          'street',
          dateParts.streetName,
          getAddressItems(dateParts.country).streetName ?? [''],
          STYLE_FOR_ADDRESS,
          props.value ?? '',
          (event: SelectChangeEvent) =>
            handleDateChange('streetName', event.target.value),
        )}
        {getFormControl(
          'postalCode',
          dateParts.postalCode,
          getAddressItems(dateParts.country).postalCode ?? '',
          STYLE_FOR_ADDRESS,
          props.value ?? '',
          (event: SelectChangeEvent) =>
            handleDateChange('postalCode', event.target.value),
        )}
      </Grid>
    </Box>
  );
};
