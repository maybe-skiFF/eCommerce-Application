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
for (let i = 1; i < 32; i++) {
  days.push(i);
}
export const AgeBlock = () => {
  const [age, setAge] = useState('');
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
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
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
          <InputLabel id="demo-select-small-label" sx={{ fontSize: '50%' }}>
            {' '}
            {SERVICE_MESSAGES.day}
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={age}
            label="Age"
            sx={{ fontSize: '50%' }}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {getDaysItems}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
          <InputLabel id="demo-select-small-label" sx={{ fontSize: '50%' }}>
            {' '}
            {SERVICE_MESSAGES.month}
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={age}
            label="Age"
            sx={{ fontSize: '50%' }}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {getMonthsItems}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
          <InputLabel id="demo-select-small-label" sx={{ fontSize: '50%' }}>
            {' '}
            {SERVICE_MESSAGES.year}
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={age}
            label="Age"
            sx={{ fontSize: '50%' }}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Box>
  );
};
