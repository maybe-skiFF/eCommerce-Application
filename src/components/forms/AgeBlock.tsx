import { Box, Divider, Grid } from '@mui/material';

import { months } from 'src/constants/dataOfConstans';
import { getFormControl, getCurrItem } from 'src/utils/createFormControl';
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
  return (
    <Box sx={{ mt: 3, mb: 3, mr: 'auto', ml: 'auto', minWidth: 120 }}>
      <Divider sx={{ mb: 2 }}>Data of your birth</Divider>
      <Grid container spacing={2}>
        {getFormControl('day', days, STYLE_FOR_DATATIME)}
        {getFormControl('month', months, STYLE_FOR_DATATIME)}
        {getFormControl('year', years, STYLE_FOR_DATATIME)}
      </Grid>
    </Box>
  );
};
