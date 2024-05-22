import {
  Box,
  Divider,
  FormHelperText,
  Grid,
  SelectChangeEvent,
} from '@mui/material';

import { useState } from 'react';
import { months } from 'src/constants/dataOfConstants';
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

  const textError: string =
    ageEnough === SERVICE_MESSAGES.checkDone ||
    ageEnough === SERVICE_MESSAGES.startCheck
      ? ''
      : ageEnough;

  localStorage.setItem('isAgeEnough', ageEnough);

  const handleDay = (event: SelectChangeEvent): void => {
    setDay(event.target.value);
    handleMouseOut();
  };

  const handleMonth = (event: SelectChangeEvent): void => {
    setMonth(event.target.value);
    handleMouseOut();
  };

  const handleYear = (event: SelectChangeEvent): void => {
    setYear(event.target.value);
    handleMouseOut();
  };

  const handleMouseOut = () => {
    if (checkAge(day, month, year) > 12 && checkAge(day, month, year) < 400) {
      setAgeEnough(SERVICE_MESSAGES.checkDone);
    } else if (checkAge(day, month, year) === 404) {
      setAgeEnough(SERVICE_MESSAGES.allFields);
    } else {
      setAgeEnough(SERVICE_MESSAGES.tooYoung);
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
      }}
      onMouseOut={handleMouseOut}
    >
      <Divider sx={{ mb: 2 }}>{SERVICE_MESSAGES.dataOfBirth}</Divider>
      <Grid
        container
        spacing={1}
        sx={{
          justifyContent: 'center',
          flexWrap: 'wrap',
          '@media screen and (max-width:520px)': {
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        {getFormControl(
          'day',
          day,
          days,
          STYLE_FOR_DATATIME,
          '',
          handleDay,
          handleMouseOut,
        )}
        {getFormControl(
          'month',
          month,
          months,
          STYLE_FOR_DATATIME,
          '',
          handleMonth,
          handleMouseOut,
        )}
        {getFormControl(
          'year',
          year,
          years,
          STYLE_FOR_DATATIME,
          '',
          handleYear,
          handleMouseOut,
        )}
        <FormHelperText sx={{ width: '80%', textAlign: 'center' }}>
          {textError}
        </FormHelperText>
      </Grid>
    </Box>
  );
};
