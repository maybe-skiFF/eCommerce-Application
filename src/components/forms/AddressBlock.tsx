import {
  SelectChangeEvent,
  MenuItem,
  Box,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useState } from 'react';
import { addresses, SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
// import { CustomerContext } from 'src/context/context';
import { updateCustomer } from 'src/utils/updateCustomer';
import { Address } from 'src/utils/interfaces';

export const AddressBlock = () => {
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [postCode, setPostCode] = useState<string>('');
  //   const { ...myCustomer } = useContext(CustomerContext);
  const handleCountryChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
    updateCustomer(myCustomer, 'country', country);
  };
  const handlePostCodeChange = (event: SelectChangeEvent) => {
    setPostCode(event.target.value);
    updateCustomer(myCustomer, 'postCode', postCode);
  };
  const handleCityChange = (event: SelectChangeEvent) => {
    setCity(event.target.value);
    updateCustomer(myCustomer, 'city', city);
  };
  const handleStreetChange = (event: SelectChangeEvent) => {
    setStreet(event.target.value);
    updateCustomer(myCustomer, 'streestreet', street);
  };
  const getCountryItems = addresses.map(country => {
    return (
      <MenuItem
        divider={true}
        value={country.country}
        key={country.country}
        sx={{ width: 1, fontSize: '45%' }}
      >
        {country.country}
      </MenuItem>
    );
  });
  const currCountry: Address = addresses.filter(
    item => item.country === country,
  )[0];

  const getCityItems = country
    ? Object.values(currCountry.city).map(city => {
        return (
          <MenuItem
            divider={true}
            value={city}
            key={city}
            sx={{ width: 1, fontSize: '45%' }}
          >
            {city}
          </MenuItem>
        );
      })
    : '';
  const getPostCodeItems = country
    ? Object.values(currCountry.postCode).map(code => {
        return (
          <MenuItem
            divider={true}
            value={code}
            key={code}
            sx={{ width: 1, fontSize: '45%' }}
          >
            {code}
          </MenuItem>
        );
      })
    : '';
  const getStreetItems = country
    ? Object.values(currCountry.street).map(street => {
        return (
          <MenuItem
            divider={true}
            value={street}
            key={street}
            sx={{ width: 1, fontSize: '45%' }}
          >
            {street}
          </MenuItem>
        );
      })
    : '';
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
        <FormControl sx={{ m: 1.5, minWidth: 120 }} size="small">
          <InputLabel id="country" sx={{ fontSize: '45%' }}>
            {SERVICE_MESSAGES.country}
          </InputLabel>
          <Select
            labelId="country"
            id="country"
            value={country}
            label="country"
            sx={{ fontSize: '50%' }}
            onChange={handleCountryChange}
          >
            {getCountryItems}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1.5, minWidth: 120 }} size="small">
          <InputLabel id="city" sx={{ fontSize: '45%' }}>
            {SERVICE_MESSAGES.city}
          </InputLabel>
          <Select
            labelId="city"
            id="city"
            value={city}
            label="city"
            sx={{ fontSize: '50%' }}
            onChange={handleCityChange}
          >
            {getCityItems}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1.5, minWidth: 130 }} size="small">
          <InputLabel id="street" sx={{ fontSize: '50%' }}>
            {SERVICE_MESSAGES.street}
          </InputLabel>
          <Select
            labelId="street"
            id="street"
            value={street}
            label="street"
            sx={{ fontSize: '50%' }}
            onChange={handleStreetChange}
          >
            {getStreetItems}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1.5, minWidth: 100 }} size="small">
          <InputLabel id="postCode" sx={{ fontSize: '50%' }}>
            {SERVICE_MESSAGES.postCode}
          </InputLabel>
          <Select
            labelId="postCode"
            id="postCode"
            value={postCode}
            label="postCode"
            sx={{ fontSize: '50%' }}
            onChange={handlePostCodeChange}
          >
            {getPostCodeItems}
          </Select>
        </FormControl>
      </Grid>
    </Box>
  );
};
