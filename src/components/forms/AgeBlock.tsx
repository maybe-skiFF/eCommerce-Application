import { FormEvent, useState } from 'react';
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  MenuItem,
  Select,
} from '@mui/material';
import { SERVICE_MESSAGES, months } from 'src/constants/SERVICE_MESSAGES';

const days: number[] = [];
const years: number[] = [];
for (let i = 1; i < 32; i++) {
  days.push(i);
}
for (let i = 2024; i > 1924; i--) {
  years.push(i);
}

export const AgeBlock = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
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
      <MenuItem value={day} key={`day${day}`}>
        {day}
      </MenuItem>
    );
  });

  const getMonthsItems = months.map((month, index) => {
    return (
      <MenuItem value={index} key={month}>
        {month}
      </MenuItem>
    );
  });
  const getYearsItems = years.map((year, index) => {
    return (
      <MenuItem value={index} key={`year${year}`}>
        {year}
      </MenuItem>
    );
  });
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <FormControl sx={{ m: 1, minWidth: 50 }} size="small">
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
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {getDaysItems}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 50 }} size="small">
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
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {getMonthsItems}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 50 }} size="small">
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
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {getYearsItems}
          </Select>
        </FormControl>
      </Grid>
    </Box>
  );
};
