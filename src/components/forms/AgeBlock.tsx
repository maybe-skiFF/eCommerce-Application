import {
  Box,
  Divider,
  FormHelperText,
  Grid,
  SelectChangeEvent,
} from '@mui/material';

import { useState } from 'react';
import { useCustomer } from 'src/context/context';
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
  const { customer, setCustomer } = useCustomer();
  const [dateParts, setDateParts] = useState({ day: '', month: '', year: '' });
  const [ageEnough, setAgeEnough] = useState<string>(
    SERVICE_MESSAGES.startCheck,
  );

  const textError: string =
    ageEnough === SERVICE_MESSAGES.checkDone ||
    ageEnough === SERVICE_MESSAGES.startCheck
      ? ''
      : ageEnough;

  const handleDateChange = (part: keyof typeof dateParts, value: string) => {
    setDateParts(prevState => ({
      ...prevState,
      [part]: value,
    }));
    handleMouseOut();
  };

  const handleMouseOut = () => {
    const age = checkAge(dateParts.day, dateParts.month, dateParts.year);
    if (age > 12 && age < 400) {
      setCustomer({
        ...customer,
        dateOfBirth:
          dateParts.year + '-' + dateParts.month + '-' + dateParts.day,
      });
    } else if (
      checkAge(dateParts.day, dateParts.month, dateParts.year) === 404
    ) {
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
          dateParts.day,
          days,
          STYLE_FOR_DATATIME,
          '',
          (event: SelectChangeEvent) =>
            handleDateChange('day', event.target.value),
        )}
        {getFormControl(
          'month',
          dateParts.month,
          months,
          STYLE_FOR_DATATIME,
          '',
          (event: SelectChangeEvent) =>
            handleDateChange('month', event.target.value),
        )}
        {getFormControl(
          'year',
          dateParts.year,
          years,
          STYLE_FOR_DATATIME,
          '',
          (event: SelectChangeEvent) =>
            handleDateChange('year', event.target.value),
        )}
        <FormHelperText sx={{ width: '80%', textAlign: 'center' }}>
          {textError}
        </FormHelperText>
      </Grid>
    </Box>
  );
};
