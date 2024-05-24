import {
  Box,
  FormControl,
  Select,
  SelectChangeEvent,
  InputLabel,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';

export function SortItem() {
  const [value, setValue] = useState<string>('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setValue(event.target.value);
  };

  return (
    <Box
      sx={{
        width: '30%',
        marginTop: '20px',
        marginBottom: '20px',
      }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          {SERVICE_MESSAGES.sort}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={SERVICE_MESSAGES.sort}
          onChange={handleChange}
        >
          <MenuItem value={'name'}>{SERVICE_MESSAGES.sortCategory_1}</MenuItem>
          <MenuItem value={'cost'}>{SERVICE_MESSAGES.sortCategory_2}</MenuItem>
        </Select>
      </FormControl>
    </Box >
  );
}
