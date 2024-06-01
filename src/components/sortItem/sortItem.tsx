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
import { SortItemProps } from 'src/utils/interfaces';

export function SortItem({ onValueChange }: SortItemProps) {
  const [value, setValue] = useState<string>('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onValueChange(newValue);
  };

  return (
    <Box
      sx={{
        width: '300px',
        marginTop: '20px',
        marginBottom: '20px',
      }}
    >
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
          <MenuItem value={SERVICE_MESSAGES.sortCategory_1}>
            {SERVICE_MESSAGES.sortCategory_1}
          </MenuItem>
          <MenuItem value={SERVICE_MESSAGES.sortCategory_2}>
            {SERVICE_MESSAGES.sortCategory_2}
          </MenuItem>
          <MenuItem value={SERVICE_MESSAGES.sortCategory_3}>
            {SERVICE_MESSAGES.sortCategory_3}
          </MenuItem>
          <MenuItem value={SERVICE_MESSAGES.sortCategory_4}>
            {SERVICE_MESSAGES.sortCategory_4}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
