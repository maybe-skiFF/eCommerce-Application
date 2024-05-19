import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { ChangeEvent } from 'react';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { STYLE_FOR_HELPER } from 'src/constants/STYLES';

const createListItem = (item: string) => {
  const sameValue = item.split(' ');
  return (
    <MenuItem
      divider={true}
      value={sameValue.length === 1 ? sameValue[0] : sameValue[1]}
      key={item}
      sx={{ width: 1, fontSize: '45%' }}
    >
      {sameValue[0].length === 1 ? '0' + sameValue[0] : sameValue[0]}
    </MenuItem>
  );
};
const getListItems = (
  items: string[] | string,
): JSX.Element[] | JSX.Element => {
  return Array.isArray(items)
    ? items.map(item => createListItem(item))
    : createListItem(items);
};
export const getFormControl = (
  purpose: string,
  selectValue: string,
  items: string[] | string,
  styles: object,
  callback?: (event: SelectChangeEvent) => void,
): JSX.Element => {
  return (
    <div>
      <FormControl sx={styles} size="small">
        <InputLabel id={purpose} sx={{ fontSize: '50%' }}>
          {purpose.toUpperCase()}
        </InputLabel>
        <Select
          name={purpose}
          labelId={purpose}
          id={purpose}
          value={selectValue}
          label={purpose.toUpperCase()}
          sx={{ fontSize: '50%' }}
          key={`${purpose}`}
          onChange={callback}
        >
          {getListItems(items)}
        </Select>
      </FormControl>
    </div>
  );
};

export const getInputProps = (
  showCallback: () => void,
  showPassword: boolean,
) => {
  return {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={showCallback}>
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  };
};

export const getTextForm = (
  purpose: string,
  state: string,
  callback: (event: ChangeEvent<HTMLInputElement>) => void,
  showPassword?: boolean,
  inputProps?: object,
): JSX.Element => {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      name={purpose}
      label={purpose}
      type={showPassword ? 'text' : 'password'}
      id={purpose}
      autoComplete={`current-${purpose}`}
      error={
        state === SERVICE_MESSAGES.checkDone ||
        state === SERVICE_MESSAGES.startCheck
          ? false
          : true
      }
      helperText={state}
      FormHelperTextProps={{
        sx: STYLE_FOR_HELPER,
      }}
      onInput={callback}
      InputProps={inputProps}
    />
  );
};
