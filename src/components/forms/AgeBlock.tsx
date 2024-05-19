import { Box, Divider, Grid, SelectChangeEvent } from '@mui/material';

import { useState } from 'react';
import { months } from 'src/constants/dataOfConstans';
import { getFormControl } from 'src/utils/createFormControl';
import { checkAge } from 'src/utils/checkAge';
import { STYLE_FOR_DATATIME } from 'src/constants/STYLES';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
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
  const [ageEnough, setAgeEnough] = useState<string>(
    SERVICE_MESSAGES.startCheck,
  );
  localStorage.setItem('isAgeEnough', ageEnough);
  const handleDay = (event: SelectChangeEvent): void => {
    setDay(event.target.value);
  };
  const handleMonth = (event: SelectChangeEvent): void => {
    setMonth(event.target.value);
  };
  const handleYear = (event: SelectChangeEvent): void => {
    setYear(event.target.value);
  };
  const handleMouseOut = () => {
    checkAge(day, month, year) > 12
      ? setAgeEnough(SERVICE_MESSAGES.checkDone)
      : setAgeEnough(SERVICE_MESSAGES.startCheck);
  };
  return (
    <Box
      sx={{ mt: 3, mb: 3, mr: 'auto', ml: 'auto', minWidth: 120 }}
      onMouseOver={handleMouseOut}
    >
      <Divider sx={{ mb: 2 }}>Data of your birth</Divider>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
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
