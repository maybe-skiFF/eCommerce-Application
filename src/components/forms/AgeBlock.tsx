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
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');

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
    <Box sx={{ mt: 3, mb: 3, mr: 'auto', ml: 'auto', minWidth: 120 }}>
      <Divider sx={{ mb: 1.5 }}>Data of your birth</Divider>
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
            {getYearsItems}
          </Select>
        </FormControl>
      </Grid>
    </Box>
  );
};
