import { useState } from 'react';
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  MenuItem,
  Select,
  Divider,
} from '@mui/material';

import { AddressInterface } from 'src/utils/interfaces';
import { SERVICE_MESSAGES, addresses } from 'src/constants/SERVICE_MESSAGES';
export const AddressBlock = () => {
  const [country, setCountry] = useState<string>('');
  const [postCode, setPostCode] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [street, setStreet] = useState<string>('');

  const handleCountryChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
  };
  const handlePostCodeChange = (event: SelectChangeEvent) => {
    setPostCode(event.target.value);
  };
  const handleCityChange = (event: SelectChangeEvent) => {
    setCity(event.target.value);
  };
  const handleStreetChange = (event: SelectChangeEvent) => {
    setStreet(event.target.value);
  };
  const currCountry: AddressInterface = addresses[`${country}`];
  const getCountryItems = Object.keys(addresses).map(country => {
    return (
      <MenuItem
        divider={true}
        value={country}
        key={country}
        sx={{ width: 1, fontSize: '50%' }}
      >
        {country}
      </MenuItem>
    );
  });
  const getCityItems = country
    ? Object.values(currCountry.city).map(city => {
        return (
          <MenuItem
            divider={true}
            value={city}
            key={city}
            sx={{ width: 1, fontSize: '50%' }}
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
            sx={{ width: 1, fontSize: '50%' }}
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
            sx={{ width: 1, fontSize: '50%' }}
          >
            {street}
          </MenuItem>
        );
      })
    : '';
  return (
    <Box sx={{ mt: 3, mb: 3, mr: 'auto', ml: 'auto', minWidth: 120 }}>
      <Divider sx={{ mb: 1.5 }}>Address</Divider>
      <Grid container spacing={2}>
        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
          <InputLabel id="country" sx={{ fontSize: '50%' }}>
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
        <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
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
        <FormControl sx={{ m: 1, minWidth: 110 }} size="small">
          <InputLabel id="city" sx={{ fontSize: '50%' }}>
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
        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
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
      </Grid>
    </Box>
  );
};
