import { FormEvent, useState, ChangeEvent } from 'react';
import {
  Box,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  MenuItem,
  Select,
  Divider,
} from '@mui/material';

import {
  SERVICE_MESSAGES,
  addresses,
  months,
} from 'src/constants/SERVICE_MESSAGES';
import { customerData } from 'src/utils/interfaces';
import { Address } from 'src/utils/interfaces';
import { createCustomer } from 'src/serverPart/ApiRoot';
const days: string[] = [];
const years: number[] = [];
for (let i = 1; i < 32; i++) {
  days.push(i.toString());
}
for (let i = 2024; i > 1924; i--) {
  years.push(i);
}

export const RegistrationBlock = () => {
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const customer: customerData = {
    firstName: name,
    lastName: lastName,
    email: email,
    password: password,
    key: email,
    dataOfBirdth: ``,
    address: {
      country: 'Russia',
      city: '',
      street: '',
      postCode: '',
    },
  };
  const HandleOnInputName = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
    customer.firstName = event.target.value;
  };
  const HandleOnInputLastName = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setLastName(event.target.value);
    customer.lastName = event.target.value;
  };
  const HandleOnInputEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
    customer.email = event.target.value;
    customer.key = event.target.value;
  };
  const HandleOnInputPassword = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setPassword(event.target.value);
    customer.password = event.target.value;
  };
  const AddressBlock = () => {
    const [country, setCountry] = useState<string>('');
    const [postCode, setPostCode] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [street, setStreet] = useState<string>('');

    const handleCountryChange = (event: SelectChangeEvent) => {
      setCountry(event.target.value);
      customer.address.country = event.target.value;
    };
    const handlePostCodeChange = (event: SelectChangeEvent) => {
      setPostCode(event.target.value);
      customer.address.postCode = event.target.value;
    };
    const handleCityChange = (event: SelectChangeEvent) => {
      setCity(event.target.value);
      customer.address.city = event.target.value;
    };
    const handleStreetChange = (event: SelectChangeEvent) => {
      setStreet(event.target.value);
      customer.address.street = event.target.value;
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
  const AgeBlock = () => {
    const [day, setDay] = useState<string>('');
    const [month, setMonth] = useState<string>('');
    const [year, setYear] = useState<string>('');

    const handleDayChange = (event: SelectChangeEvent) => {
      setDay(event.target.value);
      customer.dataOfBirdth = event.target.value;
    };
    const handleMonthChange = (event: SelectChangeEvent) => {
      setMonth(event.target.value);
      customer.dataOfBirdth += event.target.value;
    };
    const handleYearChange = (event: SelectChangeEvent) => {
      setYear(event.target.value);
      customer.dataOfBirdth += event.target.value;
    };
    const getDaysItems = days.map(day => {
      return (
        <MenuItem
          divider={true}
          value={day}
          key={`day${day}`}
          sx={{ width: 1, fontSize: '45%' }}
        >
          {day.length === 1 ? '0' + day : day}
        </MenuItem>
      );
    });

    const getMonthsItems = months.map((month, index) => {
      return (
        <MenuItem
          divider={true}
          value={index}
          key={month}
          sx={{ width: 1, fontSize: '45%' }}
        >
          {month}
        </MenuItem>
      );
    });
    const getYearsItems = years.map((year, index) => {
      return (
        <MenuItem
          divider={true}
          value={index}
          key={`year${year}`}
          sx={{ width: 1, fontSize: '45%' }}
        >
          {year}
        </MenuItem>
      );
    });
    return (
      <Box sx={{ mt: 3, mb: 3, mr: 'auto', ml: 'auto', minWidth: 120 }}>
        <Divider sx={{ mb: 2 }}>Data of your birth</Divider>
        <Grid container spacing={2}>
          <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
            <InputLabel id="day" sx={{ fontSize: '50%' }}>
              {SERVICE_MESSAGES.day}
            </InputLabel>
            <Select
              labelId="day"
              id="day"
              value={day}
              label="day"
              sx={{ fontSize: '50%' }}
              onChange={handleDayChange}
            >
              {getDaysItems}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
            <InputLabel id="month" sx={{ fontSize: '50%' }}>
              {SERVICE_MESSAGES.month}
            </InputLabel>
            <Select
              labelId="month"
              id="month"
              value={month}
              label="month"
              sx={{ fontSize: '50%' }}
              onChange={handleMonthChange}
            >
              {getMonthsItems}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
            <InputLabel id="year" sx={{ fontSize: '50%' }}>
              {SERVICE_MESSAGES.year}
            </InputLabel>
            <Select
              labelId="year"
              id="year"
              value={year}
              label="year"
              sx={{ fontSize: '50%' }}
              onChange={handleYearChange}
            >
              {getYearsItems}
            </Select>
          </FormControl>
        </Grid>
      </Box>
    );
  };
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      day: data.get('day'),
      month: data.get('month'),
      year: data.get('year'),
      country: data.get('country'),
      city: data.get('city'),
      street: data.get('street'),
      postCode: data.get('postCode'),
    });
    if (data.get) {
      customer.firstName = data.get('firstName');
      customer.lastName = data.get('lastName');
      customer.email = data.get('email');
      customer.key = data.get('email')!.slice(0, 2);
      customer.password = data.get('password');
      customer.dataOfBirdth = `${data.get('day')}/${data.get('month')}/${data.get('year')}`;
      customer.address.country = data.get('country');
      customer.address.city = data.get('city');
      customer.address.street = data.get('street');
      customer.address.postCode = data.get('postCode');
    }

    console.log(customer);
    await createCustomer(customer);
  };
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
            onSubmit={HandleOnInputName}
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
            onSubmit={HandleOnInputLastName}
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
            onSubmit={HandleOnInputEmail}
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
            onSubmit={HandleOnInputPassword}
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
