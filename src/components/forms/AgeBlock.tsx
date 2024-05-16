import { Box, Divider, Grid, SelectChangeEvent } from '@mui/material';

import { useState } from 'react';
import { months } from 'src/constants/dataOfConstans';
import { getFormControl } from 'src/utils/createFormControl';
import { STYLE_FOR_DATATIME } from 'src/constants/STYLES';
const days: string[] = [];
const years: string[] = [];

for (let i = 1; i < 32; i++) {
  days.push(i.toString());
}

for (let i = 2024; i > 1924; i--) {
  years.push(i.toString());
}

export const AgeBlock = () => {
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const handleDay = (event: SelectChangeEvent) => {
    setDay(event.target.value);
    console.log(day, 'city');
  };
  const handleMonth = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
    console.log(day, 'city');
  };
  const handleYear = (event: SelectChangeEvent) => {
    setYear(event.target.value);
    console.log(day, 'city');
  };
  return (
    <Box sx={{ mt: 3, mb: 3, mr: 'auto', ml: 'auto', minWidth: 120 }}>
      <Divider sx={{ mb: 2 }}>Data of your birth</Divider>
      <Grid container spacing={2}>
        {getFormControl('day', day, days, STYLE_FOR_DATATIME, handleDay)}
        {getFormControl(
          'month',
          month,
          months,
          STYLE_FOR_DATATIME,
          handleMonth,
        )}
        {getFormControl('year', year, years, STYLE_FOR_DATATIME, handleYear)}
      </Grid>
    </Box>
  );
};
