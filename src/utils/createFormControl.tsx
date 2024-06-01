import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import { ChangeEvent } from 'react';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { STYLE_FOR_HELPER } from 'src/constants/STYLES';
import { ValueOfCustomer } from './interfaces';
import {
  // Address,
  Customer,
  // StoreKeyReference,
} from '@commercetools/platform-sdk';

const createListItem = (item: string) => {
  const sameValue = item.split(' ');
  return (
    <MenuItem
      divider={true}
      value={sameValue.length === 1 ? sameValue[0] : sameValue[1]}
      key={item}
      sx={{
        width: 1,
        fontSize: '45%',
        '@media screen and (max-width:520px)': {
          width: '100%',
        },
      }}
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
  kind: string,
  callback?: (event: SelectChangeEvent) => void,
): JSX.Element => {
  return (
    <div style={{ maxWidth: '600px', minWidth: '100px', marginLeft: '1%' }}>
      <FormControl
        fullWidth
        sx={{
          styles,
        }}
        size="small"
        error={selectValue === ''}
      >
        <InputLabel
          id={purpose}
          sx={{
            fontSize: '50%',
          }}
        >
          {purpose.toUpperCase()}
        </InputLabel>
        <Select
          name={purpose + ' ' + kind}
          labelId={purpose}
          id={purpose}
          value={selectValue}
          label={purpose.toUpperCase()}
          sx={{
            fontSize: '50%',
            marginTop: '3%',
            '@media screen and (max-width:520px)': {
              width: '100%',
              padding: '0',
            },
          }}
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
        Object.values(SERVICE_MESSAGES).some(value => value === state) &&
        state !== SERVICE_MESSAGES.startCheck &&
        state !== SERVICE_MESSAGES.checkDone
      }
      helperText={state}
      sx={{ width: 'calc(90% - 15px)' }}
      FormHelperTextProps={{
        sx: STYLE_FOR_HELPER,
      }}
      onInput={callback}
      InputProps={inputProps}
    />
  );
};

export const createSettingsField = (
  data: Customer | undefined,
  arr: [keyof Customer],
) => {
  if (!data) {
    return;
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={3} padding={'1%'} alignItems={'center'}>
        {getSettingsList(data, arr)}
      </Stack>
    </Box>
  );
};

const getSettingsList = (
  data: Customer,
  arr: [keyof Customer] | keyof Customer,
): JSX.Element[] | undefined => {
  const result: JSX.Element[] = [];
  if (Array.isArray(arr)) {
    arr.map((item: keyof Customer) => {
      if (Array.isArray(item)) {
        return getSettingsList(data, item);
      }
      result.push(getSettingsItem(item, data[item]));
    });
  }
  return result;
};

const getSettingsItem = (
  key: keyof Customer,
  value: ValueOfCustomer,
): JSX.Element => {
  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        sx={{ width: '40%', marginLeft: '20%', marginRight: '10%' }}
        disabled
        id={key}
        label={key}
        defaultValue={value}
      />
      <EditIcon sx={{ margin: '1% 2%' }} />
      <SaveIcon sx={{ margin: '1%' }} />
    </Box>
  );
};
