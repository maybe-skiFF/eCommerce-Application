import { FormEvent, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  SelectChangeEvent,
  MenuItem,
  Divider,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

import {
  SERVICE_MESSAGES,
  addresses,
  months,
} from 'src/constants/SERVICE_MESSAGES';
// import { AgeBlock } from './AgeBlock';
// import { AddressBlock } from './AddressBlock';
import { createCustomer } from 'src/serverPart/ApiRoot';

const days: string[] = [];
const years: number[] = [];
for (let i = 1; i < 32; i++) {
  days.push(i.toString());
}
for (let i = 2024; i > 1924; i--) {
  years.push(i);
}

import { Address, customerData } from 'src/utils/interfaces';

export const RegistrationBlock = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmailName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [key, setKey] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [dataOfBirth, setDataOfBirth] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [postCode, setPostCode] = useState<string>('');
  const navigate = useNavigate();

  const HandleOnInputName = (event: ChangeEvent<HTMLInputElement>): void => {
    setFirstName(event.target.value);
    console.log(event.target.value);
  };
  const HandleOnInputLastName = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setLastName(event.target.value);
  };
  const HandleOnInputEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmailName(event.target.value);
    // setKey(event.target.value);
  };
  const HandleOnInputPassword = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setPassword(event.target.value);
  };
  const getCurrentData = () => {
    if (day.length && month.length && Number(year) > 12) {
      return `${month} ${day}, ${year}`;
    } else {
      console.log(day, month, year, 'fail');
      return 'No current data';
    }
  };
  const AddressBlock = () => {
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
    const handleDayChange = (event: SelectChangeEvent) => {
      setDay(event.target.value);
    };
    const handleMonthChange = (event: SelectChangeEvent) => {
      setMonth(event.target.value);
    };
    const handleYearChange = (event: SelectChangeEvent) => {
      setYear(event.target.value);
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

    const getMonthsItems = months.map(month => {
      return (
        <MenuItem
          divider={true}
          value={month}
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
    const myCustomer: customerData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      // key: key,
      dataOfBirdth: dataOfBirth,
      country: country,
      city: city,
      postCode: postCode,
      street: street,
    };
    console.log(myCustomer);
    setDataOfBirth(getCurrentData());
    await createCustomer(myCustomer)
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
            onChange={HandleOnInputName}
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
            onChange={HandleOnInputLastName}
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
            onChange={HandleOnInputEmail}
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
            onChange={HandleOnInputPassword}
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
